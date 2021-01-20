# Ateliers

Une distribution kubernetes c'est une version de kubernetes standard avec plus ou moins de services annexes pré-packagés.
Lors de cet atelier nous allons utiliser k3d qui est une version contenerisée de k3s qui est une distribution de kubernetes de Rancher ([k3d](https://github.com/rancher/k3d))
Cela veut dire que notre master et nos nodes seront conteneurisées et on ne pourra pas simplement accéder à leur contenu, comme sur un cluster managé par un clouder.

## Préparation

Docker et choclatey doivent être installés, cf [prérequis](../prerequis.md)

- installer k3d

```shell
# Depuis powershell avec une session admin
choco install k3d
# vérifier l'installtion
k3d version
# k3s porte la version de kubernetes
```

Pour dialoguer avec le cluster et notamment son api nous allons utiliser le client kubectl

- installer kubectl

```shell
# Depuis powershell avec une session admin
choco install kubernetes-cli
# vérifier l'installation
kubectl version --client
# vérifier que le repertoire .kube existe
mkdir $HOME/.kube
```

La version majeur du client doit être supérieure ou égale à la version du cluster (compatibiité ascendante en général)

## Création du cluster

Création d'un cluster avec k3d

```shell
# Depuis powershell avec une session admin
k3d cluster create yeap
```
