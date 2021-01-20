# Kubeconfig

Pour communiquer avec le cluster nous allons utiliser le client kubectl. Pour se connecter au cluster kubectl a besoin d'une ressource _kubeconfig_ qui est un fichier yaml qui contient les informations de connexion.

```yaml
apiVersion: v1
kind: Config
current-context: k3d-yeap
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBD....
    server: https://0.0.0.0:36249
  name: k3d-yeap
- cluster:
    ....
users:
- name: admin@k3d-yeap
  user:
    client-certificate-data: LS0tLS1CR....
    client-key-data: LS0tLS1....
- name: test
    ....
contexts:
- context:
    cluster: k3d-yeap
    user: admin@k3d-yeap
  name: k3d-yeap
- context:
  ....
```

Dans un kubeconfig on retrouve 3 parties:

- cluster: section qui contient les information pour se connecter à l'api du cluster ainsi que le certificat.
- users: section qui contient les élements pour identifier l'utilisateur qui se connecte (token, certificat, authent externe).
- context: section qui assemble un cluster et un user par son identifiant (name), le contexte est lui meme identifié par un nom.

Le nommage des ressources est aribitraire il sert uniquement d'indentiant pour manipuler les informations et les assembler.
Un fichier _kubeconfig_ peut contenir plusieurs users, plusieurs clusters et donc plusieurs contextes.

## Générer le kubeconfig

k3d permet de générer le kubeconfig pour se conneter au cluster précédement créé

```shell
k3d kubconfig get yeap
```

_kubectl_ utilise par defaut le kubeconfig dans _%userprofile%/.kube/config_
Il est possible de merger directement les informations dans notre kubeconfig par défaut

```shell
k3d kubconfig merge yeap -d
```

## Tester la connexion

```shell
kubectl cluster-info
```
