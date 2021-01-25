# Ateliers

Une distribution kubernetes correspond à une version de kubernetes standard avec plus ou moins de services annexes pré-packagés.
Lors de cet atelier nous allons utiliser k3d qui est une version conteneurisée de k3s qui est une distribution de kubernetes distribué par Rancher ([k3d](https://github.com/rancher/k3d))
Cela veut dire que notre _control plane_ et nos _nodes_ seront conteneurisées, on ne pourra pas accéder aux éléments comme sur un cluster managé par un clouder.

## Préparation

Docker et chocolatey (pour windows) doivent être installés, cf [prérequis](../prerequis.md)

- Installer k3d

<details>
<summary>Windows</summary>

```shell
# Depuis powershell avec une session admin
choco install k3d
# vérifier l'installtion
k3d version
# k3s porte la version de kubernetes
```

</details>

<details>
<summary>Linux</summary>

```shell
wget -q -O - https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash
# vérifier l'installtion
k3d version
# k3s porte la version de kubernetes
```

</details>

Pour dialoguer avec le cluster et notamment son api nous allons utiliser le client kubectl.

La version majeure du client doit avoir au maximum 1 version majeure d'écart avec la version du cluster (compatibilité de l'api)

- installer kubectl

<details>
<summary>Windows</summary>

```shell
# Depuis powershell avec une session admin
choco install kubernetes-cli
# vérifier l'installation
kubectl version --client
# vérifier que le repertoire .kube existe
mkdir $HOME/.kube
```

</details>

<details>
<summary>Linux</summary>

Consulter la page officielle du client pour télécharger la bonne version de [kubectl](https://kubernetes.io/fr/docs/tasks/tools/install-kubectl/)

```shell
# vérifier l'installation
kubectl version --client
```

</details>

## Création du cluster

Création d'un cluster avec k3d

<details>
<summary>Windows</summary>

```shell
k3d cluster create workshop -a 1 -p "8081:80@loadbalancer"
# Si le port 8081 est déjà utilisé vous pouvez utiliser un autre port local
```

</details>

<details>
<summary>Linux</summary>

```shell
k3d cluster create workshop -a 1
```

</details>
