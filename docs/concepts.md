# Concepts

## Cluster kubernetes

![concept](./assets/kubernetes.png)

### Control plane

Partie management du cluster qui est composée de plusieurs éléments qui sont souvent redondés. Dans un cluster managé le controle plane n'est pas accéssible directement et c'est le clouder qui le provisonne à la création du cluster.
Un cluster kubernetes s'efforce à tout instant de s'assurer que l'état déclarée correspond à l'état actuel du cluster, les actions sont réalisées par des déclanchements d'evenements asynchrones.

#### API

Le control plane expose une api qui permet aussi bien aux clients (developper par exemple) qu'aux différents éléments du cluster de communiquer avec le master et les nodes.
L'api est en HTTP implemnte REST, des certificats permettent de garantir l'origine des appels. L'api est versionnée et extensible.
Par exemple pour avoir l'état d'une node on va passer par l'api qui exposera l'éat de la node en interrogeant les services nécessaires, on ne se connectera pas directement à une node.

#### ETCD

Base de données du cluster qui permet de stocker les ressources et "l'état déclaratif" du cluster.

#### Control manager

Contient la logique du cluster, il est composé de plusieurs controlleurs qui interragissent avec les éléments du cluster.

#### Scheduleur

Equivalent d'une boucle inifie qui réalise l'assignation des charges de travail sur les nodes en utilisant différents algorithmes/contraintes imposées.

### Nodes

Les nodes forment la partie qui execute la charge de travail (pod). Les nodes sont souvent hétérogènes. Dans un cluster managé les nodes sont gérées par le clouder aussi bien la partie provisonnement de la vm que l'installation des composants et les configurations necessaires pour rejoindre le cluster.

#### kubeproxy & kubelet

Sur une node on retrouve trois éléments:

- le kubeproxy pour la partie réseau et
- le kubelet qui permet le dialoguer avec le master par l'api et qui dialogue avec le container runtime
- le runtime container (souvent docker mais pas necessairement)

## Ressources

Dans un cluster kubernetes tout élément est une ressource qui a une définition et des "instances" applicable pour une version de l'API.
Une ressource a forcement un nom, il faut consulter sa définition pour savoir les champs qu'il est possible de paramétrer lors de la création ou mise à jour d'une nouvelle ressource.
Le champ _kind_ et le champ _apiVersion_ permet à l'api server de valider en fonction de la définition de la ressource en question si la demande est valide.
Kubernetes fournit en standard un certain nombre de ressources qu'il sait gérer, il est possible d'étendre l'api de kubernets avec des ressources personnalisées (CRD).
Pour créer ou manipuler les ressources d'un cluster kubernetes on utilise le format de fichier yaml.

### Pods

Un pod est l'élément le plus simple et unitaire qu'un cluster kubernetes sait manipuler.
Un pod peut etre constitué d'un ou plusieurs container docker qui vont partager le meme contexte (stockage, réseau, isolation, linux namespace, cgroups...).
C'est l'unité "pod" qui sera ordonnancée sur une node et donc tous les containers au sein d'un pod seront orchestrés sur la même node.
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

### Deploiement / StatefulSets / Deamonset / Jobs

Pour manipuler plusieurs pods, gérer la redondance, les notions d'haute disponibilité, kubernetes nous permet de déclarer des charges de travail (Deploiement/StatefulSets/Deamonset/Jobs).
Chaque type de charge de travail a ces propres proprités en terme d'ordonnancement, de mise à jour des pods, ect.

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

Dans cet exemple on voit la notion de replicas qui indique le nombre de pod souhaité, cela veut dire que le cluster va essayer à tout moment de garantir l'excution de 3 pods nginx (pas forcement sur la même node).

### Services

Le service est une ressource qui permet de faire un abstraction au niveau réseau au dessus des pods. Il existe plusierus types de services pour gérer différente entrée du flux (Loadblancer, ClusterIP, NodePort).
C'est le service qui réalise la répartition du flux entre le ou les pods en destination en se basant sur les probes disponibles sur les pods.

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

Un cluster kubernetes manipule uniquement des ressources, une installation standard de kubernetes vient donc avec un certain nombres de ressources pour répondre aux problèmatiques les plus courantes.
Il existe par exemple une ressource Configmaps qui permet de stocker de la configuration qui pourra etre injecté dans un pod.
Les configmaps sont en clair, il existe une ressource sercets pour chiffrer des informations mais ce chiffrement est par défaut uniquement en base64.

```yaml
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
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: secret-exemple
type: Opaque
data:
  password: cGFzc3dvcmQK
```

### CustomResourceDefinitions (CRD)

Il est possible d'étendre l'api de kubernetes pour gérer des ressources "non standard". Pour cela il faut installer au sein du cluster la définition de la nouvelle ressource à l'aide de la ressource CRD.
Cette nouvelle ressource pourra donc etre gérée et stockée dans le cluster. Pour traiter cette nouvelle ressource il faudra déployer dans le cluster une charge de travail (POD) qui sera acapable d'analyser cette nouvelle resosurce.
Par exemple velero qui est un outil de sauvegarde, déclare à son installation des CRD notamment uen ressource permettant definir la périodicité des sauvegardes, cela permet de valider le paramétrage renseigné à l'opposé d'une configmap.
