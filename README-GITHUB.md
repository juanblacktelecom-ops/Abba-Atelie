# Abba Ateliê - Site Estático

Site estático em HTML, CSS e JavaScript, pronto para GitHub Pages.

## Arquivos principais

- index.html
- galeria.html
- style.css
- script.js
- logo-abba-atelie.jpeg
- .nojekyll

## Estrutura correta das imagens

```text
img/
  destaques/
    destaque1.jpg
    destaque2.jpg
    ...
    destaque10.jpg

  mostruario/
    foto1.jpg
    foto2.jpg
    ...
    foto100.jpg

  antes-depois/
    antes1.jpg
    depois1.jpg
```

## Importante para GitHub Pages

O GitHub diferencia letras maiúsculas e minúsculas.

Correto:

```text
foto1.jpg
destaque1.jpg
```

Evitar:

```text
Foto1.jpg
foto1.JPG
foto 1.jpg
vestido1.png
```

## Como publicar no GitHub

No terminal, dentro da pasta do site:

```bash
git add .
git commit -m "site completo abba atelie"
git push
```

Depois, no GitHub:

Settings > Pages > Deploy from a branch > main > /root

## Como testar imagem no GitHub Pages

Abra direto no navegador:

```text
https://SEU_USUARIO.github.io/SEU_REPOSITORIO/img/mostruario/foto1.jpg
```

Se abrir a imagem, o caminho está correto.
Se der 404, a imagem não subiu ou o nome está diferente.
