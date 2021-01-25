# Prérequis

Ce workshop a été construit pour être réalisé sur Windows 10 à l'origine, si necessaire l'équivalent linux pour chaque commande windows sera disponible dans un paragraphe à dérouler.

Pour réaliser ce worshop vous devez avoir installé docker sur votre machine et être l'admin de votre poste de travail.

- Installer l'outil [lens](https://k8slens.dev) pour visualiser les ressources d'un cluster

<details>
<summary>Windows</summary>

- Installer [Chocolatey](https://chocolatey.org/install) pour pouvoir installer les outils dont vous aurez besoin plus tard dans le workshop

</details>

<details>
<summary>Linux</summary>

- installer kubectx et kubens [lien](https://github.com/ahmetb/kubectx)

</details>

## Yaml

- Pour déclarer des ressources dans un cluster kubernetes ont utilise généralement le format yaml
- Les données sont présentées de manière hierarchique par leur indentation, l'ordre au sein d'un meme niveau de hierarchie n'a pas d'incidence
- La premiere indentation X espaces ou X tabulations permet de définir la validité complète du document
- Il est possible de renseigner plusieurs documents yaml au sein d'un meme fichier en utilisant un séparateur '---'
