# Prérequis

Ce workshop peut être réalisé sur Windows 10 ou linux pour chaque commande si nécessaire il y aura les versions dans un paragraphe à dérouler.

Pour réaliser ce worshop vous devez avoir installé docker sur votre machine et être l'admin de votre poste de travail.

- Installer l'outil [lens](https://k8slens.dev) pour visualiser les ressources d'un cluster

<details>
<summary>Windows</summary>

- Installer [Chocolatey](https://chocolatey.org/install) pour pouvoir installer les outils dont vous aurez besoin plus tard dans le workshop

</details>

<details>
<summary>Linux</summary>

- Installer kubectx et kubens [lien](https://github.com/ahmetb/kubectx)

</details>

## Yaml

- Pour déclarer des ressources dans un cluster kubernetes ont utilise généralement le format yaml
- Les données sont présentées de manière hiérarchique par leur indentation, l'ordre au sein d'un même niveau de hiérarchie n'a pas d'incidence
- La premiere indentation de X espaces ou X tabulations permet de définir la hiérarchie du document et les prochaines indentations devront être un multiple de ce nombre d'espaces.
- Il est possible de renseigner plusieurs documents yaml au sein d'un même fichier en utilisant un séparateur '---'
