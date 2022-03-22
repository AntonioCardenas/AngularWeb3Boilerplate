<h1 align="center">Angular Web3 Template.</h1>

<p align="center">
  <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular-logo" width="120px" height="120px"/>
  <br>
  <i>Ahora puedes agregar librerias crypto para crear he implemetar soluciones descentralizadas
    <br>Usando el poder de Angular.</i>
  <br>
</p>






[Read in english][english].

[english]: README.md


Este proyecto fue generado usando el  [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3

## Servidor de desarrollo

Ejecuta `ng serve` para lanzar el servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicacione se reiniciara automaticamente al hacer algun cambio en los archivos de la aplicación.

## Generar plantilla de codigo

Ejecuta `ng generate component component-name` para generar un nuevo componente tambien puedes
Usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construir

Ejecuta `ng build` para construir el proyecto. el resultado de la contruccion estara alamacenada en el directorio `dist/`.

## Ejecutar pruebas unitarias 

Ejecuta `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Ejecutar pruebas de principio a fin

Ejecuta `ng e2e` para ejecutar pruebas de principio a fin en la plataforma de su elección. para usar este comando, primero necesitas agregar un paquete que implemente funcionalidades de pruebas de principio a fin.

## Provedor
Esta Dapp usa web3modal nos permite conectarnos a mas de un provedor de wallet 
puedes obtener mas información [aqui](https://github.com/Web3Modal/web3modal)

## Obetener credencial en infura 

Crea una cuenta en infura [aqui](https://infura.io/)
En web3.service.ts linea 31 ingresa tus credenciales en infuraId: ''

## Change Network

en ``web3.serrvice.ts`` linea 56 tu puedes cambiar la red a la que quieras usar cambiando
 ``network: "mainnet",``  a , ``network: "rinkeby",``  o  ``network: "ropsten",``

## Dependencias y cambios con respecto a una aplicación Angular tradicional 

**tsconfig.json**

```json 
  "compilerOptions": {
    "paths":{
      "crypto": ["./node_modules/crypto-browserify"],
      "stream": ["./node_modules/stream-browserify"],
      "assert": ["./node_modules/assert"],
      "http": ["./node_modules/stream-http"],
      "https": ["./node_modules/https-browserify"],
      "url": ["./node_modules/url"],
      "os": ["./node_modules/os-browserify"],
    },
    ....
    ....
  "angularCompilerOptions": {
    "allowSyntheticDefaultImports": true,
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "noImplicitAny": false,
    "strictTemplates": true,
    "strictNullChecks": false
  }

```

