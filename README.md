# Coffee-Box Project

WIFI - Project based on JavaScript and Bootstrap.
(Pull-Requests will be ignored)

## NPM Packages

* [JQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Browser-Sync](https://www.browsersync.io/)

---

## Pre-Step

Initialize NodePackageManager

```bash
npm init
```

Clone remote git-repository

```bash
git clone https://github.com/D3sti/coffeebox.git
```

Pull the last revision of the git-repository

```bash
git pull origin master
```

After code commits, the code should be pushed up to the remote git-repository

```bash
git push origin master
```

---

## JQuery

```bash
npm install jquery --save
```
---

## Bootstrap

```bash
npm install bootstrap --save
```
---
## Browser-Sync


Install browser-sync global. Open your terminal and run the following command:

```bash
npm install -g browser-sync
```

You have to redirect to the coffeebox folder, where the index.html is located. Otherwise the upcomming browser-sync command throws an error! (could not find html* files)

```bash
 D:\<yourdirectorypath> cd .\coffeebox\
```

Now start a static server with the following command line:
```bash
browser-sync start --server --files "stylesheets/*.css, scripts/*.js, *.html"
```

The server instance will open your standard browser automatically and write some information in the terminal console line:

```bash
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.100:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.100:3001
 --------------------------------------
[Browsersync] Serving files from: ./
[Browsersync] Watching files...

```

**Cool Feature**: If you modify a file and save your changes locally, the browser will be updated on the fly :)

---
