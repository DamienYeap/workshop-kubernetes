# Deployer une application

> Se placer dans le workspace workshop pour réaliser la suite de l'atelier

## Exercice 1

L'unité la plus petite que peut gérer un cluster est le pod.

On va dans ce premier exercice déployer un pod avec la command _k run_.

Le minimum d'informations qu'il faut fournir pour qu'un pod s'execute est un nom et une image docker.

> Par défaut la registry utilisé est le dockerhub

Executer la commande:

```ssh
k run --generator=run-pod/v1 --image=nginxdemos/hello hello
# pour suivre le cycle de vie du pod hello
k get po -w
```

- Consulter la page nginx en réalisant un port-forward sur le port 80 du pod

## Exercice 2

Il est possible de réaliser les mêmes opérations qu'avec un container docker sur son poste

- Consulter les logs avec la commande _k logs_
- Obtenir un shell dans le container avec la commande _k exec_

Il est possible de copier des fichiers depuis et vers le container aevc la commande _k cp_.
Pour notre image nginx la configuration du helloworld est dans /etc/nginx/conf.d/hello.conf.

- Récupérer la configuration du helloworld avec la commande _k cp_

> Ces opérations se réalisent au niveau d'un container, si votre pod contient plusieurs pod il faudra préciser le container cible en plus du pod.
> Les contraintes d'utilisation de docker s'appliquent aussi dans le cadre de kubernetes, une modification dans un container sera perdu lors d'une relance d'un pod à moins d'être dans un volume persisté en dehors du container.

<details>
<summary>Solution</summary>

```shell
k logs hello
k exec -it hello -- /bin/sh
k cp hello:/etc/nginx/conf.d/hello.conf .
```

</details>

## Exercice 3

- Lancer la commande _k exec -it hello -- nginx -s stop_ et consulter le pod

> Le conteneur s'arrête et le pod passe dans l'état _completed_

Pour gérer la résiliance des applications il faut utiliser les ressources pour gérer la charge de travail (deployments, statefulsets, ect).

- Supprimer le pod exsitant avec la commande _k delete_
- Déployer l'application avec la commande _k run --image=nginxdemos/hello hello_
- Consulter les ressources pod, deploiement, replicasets
- Supprimer un pod et observer le cycle de vie des pods du namespace

<details>
<summary>Solution</summary>

```shell
k delete po hello
k run --image=nginxdemos/hello hello
k get po
k get deploy
k get rs
k delete po -l run=hello --wait=false && k get po -w
```

</details>

## Exercice 4

- un scaling
- un service
- un ingress
- les labels a les annotations
