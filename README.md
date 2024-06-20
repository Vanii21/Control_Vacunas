# Control de Vacunas

Aplicación para el ingreso de empleados y dar seguimiento de las dosis de vacunas de COVID-19, dashboard con estadísticas de los empleados que tiene sus dosis, rank de vacuna más administrada y reporte de seguimiento para la siguiente dosis.


# Requisitos

- Windows 10 o Superior (64x)
- Visual Studio Code
- Visual Studio 2022 o Superior (Lenguaje C#)
- Microsoft SQL Server Managment Studio 2019
- SQL Server
- React 18
- Vite

# Instalación
Instalación de lenguajes de programación:
- Visual Studio Code.
- Visual Studio 2022 o Superior (Lenguaje C#)

Instalación de base de datos:
- Microsoft SQL Server Managment Studio 2019
- SQL Server

Instalación de frameworks:
- React 18
- Vite

Se debe clonar el repositorio en cualquier carpeta deseada, para tener las carpetas siguientes: Client y Server

## Ejecución
CARPETA CLIENT:
Abrir Visual Studio Code y abrir la carpeta app_ControlVacunas, dirigirse a la carpeta "Client" el cual ejecuta la parte del frontend. En el cmd estando en la ruta /Client ejecutar la siguiente línea de código: "yarn dev", el cual levanta el frontend. 

CARPETA SERVER:
Levantar Visual Studio 2022 y abrir el proyecto "Server" que se encuentra en la carpeta app_ControlVacunas, el cual ejecuta la parte del backend. Ejecutar proyecto con F5 o con el botón start llamado "server"

## Conexion a la base de datos
el archivo appsettings.json se encuentra la cadena de conexion el cual permite la cominacion y el envio de informacion. Colocar sus propias credenciales:

"ConnectionStrings": {
  "MainConnection": "Server=*****; Database=*****; User Id=*****; Password=*****;"
}

## Visualización 

La aplicación se despliega en la siguiente ruta: http://localhost:5173/

## LINK para el video de explicacion

Drive: https://drive.google.com/file/d/137MhiNqdxoNmljQzAMeD_C2DKWQSp1zK/view?usp=sharing
En el minuto 19:55 explico la parte grafica de como quedo la aplicacion.
