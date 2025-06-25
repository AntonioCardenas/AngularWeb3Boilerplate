# Angular Web3 DApp

Una aplicación descentralizada (DApp) moderna construida con Angular y ethers.js para integración con la blockchain de Ethereum.

## Características

- **Conexión de Billetera**: Conecta con MetaMask y otras billeteras Web3
- **Envío de Transacciones**: Envía transacciones ETH con precio de gas en tiempo real
- **Interacción con Contratos Inteligentes**: Interactúa con tokens ERC-20 y otros contratos inteligentes
- **Actualizaciones en Tiempo Real**: Información de billetera y red en vivo
- **Interfaz Moderna**: Diseño hermoso y responsivo con animaciones suaves
- **Soporte TypeScript**: Seguridad de tipos completa con ethers.js v6

## Tecnologías Utilizadas

- **Angular 17**: Framework Angular más reciente con componentes independientes
- **ethers.js v6**: Implementación completa de billetera Ethereum y utilidades
- **TypeScript**: Desarrollo con seguridad de tipos
- **SCSS**: Estilos avanzados con CSS Grid y Flexbox
- **RxJS**: Programación reactiva para gestión de estado
- **PrimeNG**: Componentes de interfaz de usuario profesionales

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone <url-del-repositorio>
   cd angularweb3
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:

   ```bash
   npm start
   ```

4. **Abre tu navegador** y navega a `http://localhost:4200`

## Prerrequisitos

- **Node.js** (v18 o superior)
- **MetaMask** extensión del navegador instalada
- **Red de prueba de Ethereum** (Goerli, Sepolia) o acceso a mainnet

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── wallet/
│   │   │   └── wallet.component.ts          # Conexión e información de billetera
│   │   ├── transaction/
│   │   │   └── transaction.component.ts     # Envío de transacciones ETH
│   │   └── contract/
│   │       └── contract.component.ts        # Interacción con contratos inteligentes
│   ├── services/
│   │   └── ethereum.service.ts              # Funcionalidad principal de Ethereum
│   └── app.ts                              # Componente principal de la aplicación
├── styles.scss                             # Estilos globales
└── main.ts                                 # Punto de entrada de la aplicación
```

## Componentes Principales

### 1. Servicio Ethereum (`ethereum.service.ts`)

El servicio principal que maneja todas las interacciones con la blockchain de Ethereum:

- **Conexión de Billetera**: Conecta con MetaMask y otros proveedores Web3
- **Gestión de Transacciones**: Envía transacciones ETH con manejo adecuado de errores
- **Interacción con Contratos Inteligentes**: Crea instancias de contratos y llama métodos
- **Detección de Red**: Detecta y muestra automáticamente la red actual
- **Seguimiento de Saldo**: Actualizaciones de saldo de billetera en tiempo real

### 2. Componente Billetera (`wallet.component.ts`)

Muestra información de la billetera y proporciona funcionalidad de conexión:

- **Conectar/Desconectar**: Conexión fácil de billetera con MetaMask
- **Información de Billetera**: Muestra dirección, saldo, red e ID de cadena
- **Manejo de Errores**: Mensajes de error amigables para el usuario
- **Diseño Responsivo**: Funciona en todos los tamaños de dispositivos

### 3. Componente Transacción (`transaction.component.ts`)

Permite a los usuarios enviar transacciones ETH:

- **Validación de Dirección**: Asegura direcciones Ethereum válidas
- **Validación de Cantidad**: Previene cantidades de transacción inválidas
- **Visualización de Precio de Gas**: Muestra precios de gas actuales de la red
- **Seguimiento de Transacciones**: Muestra hashes de transacción y enlaces a Etherscan

### 4. Componente Contrato (`contract.component.ts`)

Interactúa con tokens ERC-20 y contratos inteligentes:

- **Carga de Contratos**: Carga y muestra información del contrato
- **Transferencias de Tokens**: Transfiere tokens ERC-20
- **Visualización de Saldo**: Muestra saldos de tokens y detalles del contrato
- **Historial de Transacciones**: Rastrea interacciones con contratos

## Ejemplos de Uso

### Conectar Billetera

```typescript
import { EthereumService } from './services/ethereum.service';

constructor(private ethereumService: EthereumService) {}

async conectarBilletera() {
  const exito = await this.ethereumService.connectWallet();
  if (exito) {
    console.log('Billetera conectada exitosamente!');
  }
}
```

### Enviar Transacción ETH

```typescript
async enviarTransaccion() {
  try {
    const hash = await this.ethereumService.sendTransaction(
      '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      '0.01'
    );
    console.log('Hash de transacción:', hash);
  } catch (error) {
    console.error('Transacción falló:', error);
  }
}
```

### Interactuar con Contratos Inteligentes

```typescript
async interactuarConContrato() {
  const contrato = await this.ethereumService.getContract(
    '0x1234567890123456789012345678901234567890',
    ERC20_ABI
  );

  const saldo = await contrato['balanceOf'](direccionBilletera);
  console.log('Saldo de token:', ethers.formatUnits(saldo, 18));
}
```

## Redes Soportadas

- **Ethereum Mainnet** (Chain ID: 1)
- **Goerli Testnet** (Chain ID: 5)
- **Sepolia Testnet** (Chain ID: 11155111)
- **Polygon Mainnet** (Chain ID: 137)
- **Mumbai Testnet** (Chain ID: 80001)
- **Localhost** (Chain ID: 1337)

## Características de Seguridad

- **Validación de Direcciones**: Todas las direcciones Ethereum se validan antes de usar
- **Validación de Cantidades**: Las cantidades de transacción se validan para prevenir errores
- **Manejo de Errores**: Manejo integral de errores con mensajes amigables para el usuario
- **Seguridad de Tipos**: Soporte completo de TypeScript previene errores en tiempo de ejecución

## Características de UI/UX

- **Diseño Moderno**: Interfaz limpia y profesional con fondos degradados
- **Diseño Responsivo**: Funciona perfectamente en escritorio, tablet y móvil
- **Animaciones Suaves**: Efectos hover y transiciones para mejor experiencia de usuario
- **Estados de Carga**: Retroalimentación visual durante operaciones asíncronas
- **Estados de Error**: Mensajes de error claros y opciones de recuperación

## Despliegue

### Construir para Producción

```bash
npm run build
```

### Desplegar en Netlify

1. Construye el proyecto: `npm run build`
2. Despliega la carpeta `dist/angularweb3/browser` en Netlify

### Desplegar en Vercel

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Angular y desplegará

## Contribuir

1. Haz fork del repositorio
2. Crea una rama de características: `git checkout -b nombre-caracteristica`
3. Confirma tus cambios: `git commit -am 'Agregar característica'`
4. Empuja a la rama: `git push origin nombre-caracteristica`
5. Envía un pull request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## Agradecimientos

- **Equipo de ethers.js** por la excelente biblioteca de Ethereum
- **Equipo de Angular** por el increíble framework
- **Equipo de MetaMask** por la integración de billetera Web3
- **Equipo de PrimeNG** por los componentes de interfaz de usuario

## Soporte

Si tienes alguna pregunta o necesitas ayuda, por favor:

1. Revisa la página de [Issues](../../issues)
2. Crea un nuevo issue con información detallada
3. Contacta a los mantenedores

---

**¡Feliz Desarrollo Web3!**
