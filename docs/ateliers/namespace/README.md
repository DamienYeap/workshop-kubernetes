# Namespace & Scope

Dans un cluster kubernetes il est possible de faire de l'isolation par namespace qui se traduit par des restrictions d'accès et un nommage unique au sein d'un namespace.
On utilise les namespaces pour isoler certaines applications d'autres applications avec des droits utilisateurs. Ce n'est pas une isolation forte en dehors des droits utilisateurs.

Par défaut une interrogation d'un client ou d'un service au sein d'un cluster se réalise sur le namespace courant.

## Exercice 1

- Lister les namespaces du cluster (utiliser l'alias de namespaces _k api-resources_)
- Créer un namespace workshop
- Se placer dans le namespace créé avec la commande 'k config set-context --current --namespace=workshop'
- lister les pods du namespace courant (option par defaut)
- lister tous les pods du cluster
- lister les pods du namespace _kube-system_ depuis le namespace workshop (utiliser l'option -n)

<details>
<summary>Solution</summary>

```shell
k get ns
k create ns workshop
k config set-context --current --namespace=workshop
k get po
k get po -A
k get po -n kube-system
```

Certaines ressources ont un scope cluster d'autres ressources ont un scope namespace, utiliser _k api-resources_ pour connaître le scope.

</details>

## Exercice 2

Pour faciliter les changements de contextes il existe des outils kubens et kubectx. Pour windows suivre le guide ci-dessous pour linux voir la section prérequis.

<details>
<summary>Windows</summary>

Télécharger les deux binaires kubenswin et kubectxwin aux urls suivantes :

- [kubenswin](https://github.com/thomasliddledba/kubenswin/blob/master/bin/kubenswin.exe)
- [kubectxwin](https://github.com/thomasliddledba/kubectxwin/blob/master/bin/kubectxwin.exe)

Créer un répertoire pour ces deux binaires et ajouter ce répertoire à votre PATH
(Click droit "Ce PC" dans l'exporateur de fichiers -\> Propriétés -\> Paramètres système avancés -\> Variables d'environnement -\> Path)

</details>

- utiliser kubenswin ou kubens (Linux) pour naviguer entre les namespaces
- consulter son kubeconfig entre chaque changement et comprendre les changements réalisés par kubenswin (sur windows C:\Users\\<user\>\\.kube\config)

Il existe aussi la commande kubectxwin ou kubectx (Linux) pour changer entierement de contexte (changer de cluster)

> Toujours vérifier son contexte avant d'appliquer un changement sur un cluster !
