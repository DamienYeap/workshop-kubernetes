# Concepts

## Cluster kubernetes

![concept](./assets/kubernetes.png)

### Control plane

Partie management du cluster qui est composée de plusieurs éléments qui sont souvent redondés. Dans un cluster managé le _control plane_ n'est pas accéssible directement et c'est le clouder qui le provisionne à la création du cluster.
Un cluster kubernetes s'efforce à tout instant de s'assurer que l'état souhaité correspond à l'état actuel du cluster, les actions sont réalisées par des déclenchements d'evenements asynchrones.

#### API

Le control plane expose une api qui permet aussi bien aux clients (un devops par exemple) qu'aux différents éléments techniques du cluster de communiquer avec les controleurs et les nodes.
L'api est en HTTP et implemente REST, des certificats permettent de garantir l'origine des appels. L'api est versionnée et extensible.
Par exemple pour avoir l'état d'une node on va requeter l'api qui exposera l'état de la node en interrogeant les services nécessaires, on ne se connectera pas directement à une node.

#### ETCD

Base de données du cluster qui permet de stocker les ressources et "l'état déclaratif" du cluster.

#### Control manager

Contient la logique du cluster, il est composé de plusieurs contrôleurs qui interragissent avec les éléments du cluster.

#### Scheduleur

Réalise l'assignation des charges de travail (Pods) sur les nodes en utilisant différents algorithmes/contraintes imposées.

### Nodes

Les nodes forment la partie qui execute la charge de travail (Pods). Les nodes sont souvent hétérogènes. Dans un cluster managé les nodes sont gérées par le clouder aussi bien la partie provisonnement de l'instance (vm) que l'installation des composants et les configurations necessaires pour rejoindre le cluster.

#### kubeproxy & kubelet

Sur une node on retrouve trois éléments:

- le kubeproxy pour la partie réseau
- le kubelet qui permet le dialoguer avec le master par l'api et qui dialogue avec le container runtime
- le runtime container (souvent docker mais pas obligatoire)

## Ressources

Dans un cluster kubernetes, tout élément est une ressource qui a une définition et des "instances" selon une version de l'API.
Une ressource a obligatoirement un nom, il faut ensuite consulter sa définition pour savoir les champs qu'il est possible de paramétrer lors de la création ou mise à jour d'une nouvelle ressource.
Le champ _kind_ et le champ _apiVersion_ permet à l'api server de valider en fonction de la définition de la ressource en question si la demande est valide.
Kubernetes offre en standard un certain nombre de ressources qu'il sait gérer, il est possible d'étendre l'api de kubernetes avec des ressources personnalisées (CRD).
Pour créer ou manipuler les ressources d'un cluster kubernetes on utilise le format de fichier yaml.

### Pods

Un pod est l'élément le plus simple et unitaire qu'un cluster kubernetes sait manipuler.
Un pod peut etre constitué d'un ou plusieurs containers docker qui vont partager le même contexte (stockage, réseau, isolation, linux namespace, cgroups...).
C'est l'unité "pod" qui sera ordonnancée sur une node et donc tous les containeurs au sein d'un pod seront orchestrés sur la même node.
Généralement on ne manipule pas directement les pods mais les ressources de plus haut niveau.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-envar-demo
spec:
  containers:
    - name: nginx-envar-demo-container
      image: nginx:1.14.2
      env:
        - name: DEMO_GREETING
          value: "Hello from the environment"
      ports:
        - containerPort: 80
```

Cycle de vide d'un pod

![pod](./assets/pod.jpeg)

### Deploiement / StatefulSets / Deamonset / Jobs

Pour manipuler plusieurs pods, gérer la redondance, les notions d'haute disponibilité, kubernetes nous permet de déclarer des charges de travail (Deploiement/StatefulSets/Deamonset/Jobs/...).
Chaque type de charge de travail a ces propres proprités en terme d'ordonnancement, de mise à jour des pods, ect. Cette ressource gère la gestion de la montée de version des pods, des rollbacks.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
          ports:
            - containerPort: 80
```

Dans cet exemple on voit la notion de replicas qui indique le nombre de pod souhaité, cela veut dire que le cluster va essayer à tout moment de garantir l'execution de 3 pods nginx (pas forcement sur la même node).

### Services

Le service est une ressource qui permet de faire un abstraction au niveau réseau au dessus des pods. Il existe plusieurs types de services pour gérer différentes entrées du flux (Loadbalancer, ClusterIP, NodePort).
C'est le service qui réalise la répartition du flux entre le ou les pods en destination en se basant sur la disponibilité des pods. Il fait un pont par bind de port entre un flux entrant et les pods cibles. Un service peut gérer plusieurs ports d'entrée mais un port d'entrée doit correspondre à un seul port cible.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service-nginx
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 8000
      targetPort: 80
```

### Configmaps & Secrets

Un cluster kubernetes manipule uniquement des ressources, une installation standard de kubernetes vient donc avec un certain nombre de ressources pour répondre aux problèmatiques les plus courantes.
Il existe par exemple une ressource ConfigMap qui permet de stocker de la configuration qui pourra etre injecté dans un pod.
Les configmaps sont en clair, il existe une ressource sercets pour chiffrer des informations mais ce chiffrement est par défaut uniquement en base64.

````yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: exemple
data:
  ui_properties_file_name: "user-interface.properties"
  user-interface.properties: |
    color.good=purple
    color.bad=yellow
    allow.textmode=true
```kubernetes-dashboard

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-exemple
type: Opaque
data:
  password: cGFzc3dvcmQK
````

### CustomResourceDefinitions (CRD)

Il est possible d'étendre l'api de kubernetes pour gérer des ressources "non standard". Pour cela il faut installer au sein du cluster la définition de la nouvelle ressource à l'aide de la ressource CRD.
Cette nouvelle ressource pourra donc etre gérée et stockée dans le cluster. Pour traiter cette nouvelle ressource il faudra déployer dans le cluster une charge de travail (POD) qui sera capable de gérer cette nouvelle resosurce.
Par exemple velero qui est un outil de sauvegarde, déclare à son installation des CRD notamment une ressource permettant definir la périodicité des sauvegardes, cela permet de valider le paramétrage renseigné au contraire d'une configmap.

## Deploiements

Schéma présentant une partie des ressources liées au déploiement d'une application.

![deployment](./assets/deployments.png)

## DNS

Dans une distirbution de kubernetes, un resolver dns est installé (CoreDNS). Il permet au cluster de faire la résolution dns à l'interieur du cluster.
Chaque élément d'un cluster a une ip dans le réseau virtuel du cluster (pods, service, ect). CoreDNS permet de résoudre ces IPs interne qui sont très volatiles par un nom.
A l'intérieur d'un namespace on pourra directement accéder à un service directement par son nom. On peut acceder au service d'un autre namespace par l'enregistement _&lt;service&gt;.&lt;namespace&gt;.svc.cluster.local_ (exemple: hello.workshop.svc.cluster.local)
