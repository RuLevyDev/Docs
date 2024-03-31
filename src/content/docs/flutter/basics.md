---
title: Basics
description: Flutter Basics
---
## Widget
Un widget es el tipo básico de controlador en _Flutter Material_.
Hay dos tipos de widgets básicos que podemos extender en nuestras clases: `StatefulWidget` o `StatelessWidget`.

### Con estado(StateFull)
**StatefulWidget** son todos los widgets que internamente tienen un valor dinámico que puede cambiar durante el uso. Puede recibir un valor de entrada en el constructor o referencia a funciones.
Necesitas crear dos clases como estas:

```dart
class BasePage extends StatefulWidget {
  State<StatefulWidget> createState() {
    return _BasePageState();
  }
}

class _BasePageState extends State<BasePage> {
  int _value = 0;
  
  void _increment() {
    setState(() {
      _value++;
    });
  }
}
```

Cuando vayas a actualizar el valor, necesitas envolverlo en la función `setState(() {})`.

Si deseas imitar el `viewDidLoad` de iOS, puedes usar en la clase State esta llamada:

```dart
@override
void initState() {
  super.initState();
  // agregar aquí qué hacer, por ejemplo, obtener datos de forma remota
}
```

En cambio, si deseas ser activado en la actualización de estado:

```dart
@override
void didUpdateWidget(CurrentType oldWidget) {
  super.didUpdateWidget(oldWidget);
  // aquí puedes verificar el valor del estado del widget anterior y compararlo con el actual
}
```

### Sin estado(StateLess)
**StatelessWidget** son componentes que se renderizan y mantienen ese valor. Se necesita una actualización por parte de un padre para actualizar el contenido. Puede recibir un valor desde el constructor.

## Model
Dart tiene una forma agradable de crear una inicialización usando el enfoque como { this.param, this.param2 }.

```dart
class Nuevo {
  final String elemento;
  final double numero;
  
  Nuevo({ this.elemento, this.numero });
}
```

Para tener parámetros obligatorios, necesitas incluir `flutter/material.dart` para que puedas transformar tu clase a:

```dart
class En {
  final String elemento;
  final double numero;
  
  En({ @required this.elemento, @required this.numero });
}
```

Si envuelves un parámetro entre **[]**, ese parámetro es opcional.

### Modelo de alcance
Es una buena manera de compartir datos dentro de la aplicación en un lugar único, accesible en cualquier otra clase. El modelo de alcance te brinda una forma de mantener el estado del modelo creado anteriormente.
Una vez que se ha importado *scope_model*, puedes crear el modelo así:

```dart
class ModeloEn extends Model {
}
```

Cuando trabajas con elementos, es mejor **evitar** devolver la lista que estás usando para gestionar internamente los elementos, es mejor usar una copia de eso.
Así que tenemos que usar un **getter**.

```dart
class ModeloEn extends Model {
  List<String> _elemento = [];
  List<String> get elemento {
    List.from(_elemento);
  }; 
}
```

Para usar eso más tarde, en el método **build** del widget tienes que:

```dart
return ScopeModelDescendant<ModeloEn>(builder: (BuildContext context, Widget child, ModeloEn model){
  return _construirWidget(model.elemento);
},);
```
Cada vez que se llama a la construcción, los datos se leen nuevamente del estado.

Podemos forzar la actualización de una función de construcción utilizando `notifyListeners()`.

Si tienes más de un modelo, es mejor crear un modelo `main.dart` como este:

```dart
class ModeloPrincipal extends Model with Nuevo, ModeloEn {}
```


**Centralizar**
Para evitar llamar a esto en todas las clases, podemos envolver fácilmente nuestro MaterialApp en `ScopeModel<ModeloEn>(child: MaterialApp[…], model: ModeloEn())`.

Así, todos los hijos de MaterialApp tendrán acceso a la estructura de ModeloEn.

Para tener acceso, todavía tendrás que usar ScopeModelDescendant para envolver el widget que lo usará como se muestra arriba.


## IU
### Icono y página de inicio
https://flutter.io/assets-and-images/#updating-the-launch-screen

### Tamaño de pantalla
`Size(MediaQuery.of(context).size.width`

### Colores y temas

Puedes acceder a los colores usando `Colors.white`.
Cada color tiene un parámetro adicional `withOpacity()` que puedes usar para establecer la opacidad.

Puedes usar colores de tema usando `Theme.of(context).accentColor`

### Estilo
Puedes agregar estilo adicional (color de fondo, esquinas redondeadas, etc.) a un widget usando `DecoratedBox`.

```
DecorationBox(decoration: BoxDecoration());
```

## Diseño

`ListView` actúa como una buena pila para poner elementos en columnas.
Si contiene solo un objeto, usa `SingleChildScrollView`.

Tanto `Column` como `Row` están bien pero no admiten desplazamiento.
Si quieres que un widget en una columna/fila ocupe tanto espacio como sea posible, envuélvelo en `Expanded`.
También está disponible `Flexible` y puedes proporcionar qué prioridad o peso tendrá el widget.
Tanto `Expanded` como `Flexible` aceptan un parámetro `flex`, donde puedes pasar un peso.

`SizeBox` es un widget con tamaño fijo, es útil por ejemplo para agregar un margen simple entre widgets.

`Container` es una caja donde puedes agregar tu Widget y establecer algunos parámetros como _margen_, _relleno_, _color_, _decoración_, etc.

### Tamaño
`MediaQuery` es una herramienta poderosa para hacer una IU adaptable según las características del dispositivo (por ejemplo, _tamaño de pantalla_, _orientación_).

```dart
MediaQuery.of(context)
```

## Navegación

### Ruta a otra página sin retroceso (por ejemplo, en Android final)

```dart
Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (BuildContext context) => Clase(
                          param: valor,
                        ),
                  )),
```
### Ruta a otra página con retroceso

```dart
Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (BuildContext context) => Clase(
                          param: valor,
                        ),
                  )),
```

#### Atrás (Básico)
`Navigator.pop(context);`

#### Atrás (Pasando datos)
`Navigator.pop(context, valor_de_retorno);`

#### Acción después de la navegación
En ciertos casos, es útil desencadenar una acción cuando se llama a una navegación, puedes hacerlo combinando una función `then((_) {})` en el tubo del navegador.

También editar `Navigator.push<tipo>[…].then((tipo valor) {})` agregando el tipo de futuro.

## Barra lateral

###3 Agregar cajón izquierdo
En el cajón podemos listar varias entradas, cada una de ellas puede tener (o no) un ícono.
```dart
Nuevo Scaffold(drawer: 
	Drawer(child: 


		Column(children: <Widget>[ 
			AppBar(title: Text(‘Elegir’), AutomaticallyImplyLeading: false ), 
			ListTile(
			leading: Icon(Icons.list),
			title: Text(’Algo de texto’), 
			onTap: () {} 
            ),
        ]),
    ),
 )
```

#### Agregar cajón derecho 
`Nuevo Scaffold(endDrawer:`

## Pestañas
El cuerpo de Scaffold necesita tener TabBarView para administrar el cambio entre los contenidos de las pestañas.
El número en longitud es obligatorio que sea el mismo que los elementos en TabBarView y las pestañas de TabBar.

Las páginas no deben ser un Widget Scaffold, sino directamente el cuerpo porque están en TabBarView que ya tiene un Scaffold.

#### Agregar cajón con pestaña en la parte superior como Android
```dart
DefaultTabController(length: 2, child: Scaffold( body: TabBarView(),  appBar: AppBar(bottom: TabBar(tabs: <Widget>[ Tab(icon:, text:) ]))));
```

### Agregar cajón con pestaña en la parte inferior como iOS
```dart
DefaultTabController(length: 2, child: Scaffold( body: TabBarView(), bottomNavigationBar:  TabBar(tabs: <Widget>[ Tab() ])));
```


## Enrutamiento
Agrega en MaterialApp principal una nueva clave de rutas que admita un mapa.

```dart
routes: {
	“/“:  (BuildContext context) => ClaseHome()
	“/admin”: (BuildContext context) => ClaseAdmin()
}
```

Luego, en cada parte de la aplicación puedes llamar a .pushReplacementNamed(‘/admin’, context);
Nota:
Si configuras “/“, debes eliminar el valor de inicio en el material app o se generará un error.

### Pasar valor en rutas
En lugar de usar rutas, necesitas usar la clave onGenerateRoutes.
Si una ruta ya está definida en las rutas, generará un error.

```dart
onGenerateRoutes: (RouteSettings settings) {
	final List<String> elementosDeRuta = settings.name.split(“/“);

	if(elementosDeRuta[0] != “”) {
		return null;
	}
	if(elementosDeRuta[1] == ‘producto’) {
		final int índice = int.parse(elementosDeRuta[2]);
		return MaterialPageRoute<bool>(builder: (BuilderContext context) => PáginaProducto(_productos[índice]))
	}
	return null;
}
```

En este escenario, el archivo principal debe convertirse en StatefulWidget para centralizar dónde se almacenan las variables.
En el ejemplo, configuré MaterialPageRoute para devolver un bool, pero podemos ver eso para cualquier otro tipo.

Luego puedes llamar a .pushNamed(context, ‘/producto/‘ + índice.toString())

También hay una callback para ruta no registrada en onUnkownRoute.


## Alert

showDialog utilizando un AlertDialog como Widget.

```dart
showDialog(context: context, builder: (BuilderContext context) {
	return AlertDialog(
		title: Text(),
		content: Text(),
		actions: <Widget> [
			FlatButton(child: Text(), onPressed: () {
				Navigator.pop(context); // cerrar el diálogo
			})
		]);
});
```

## Modal

```dart
showModalButtonSheet(context: context, builder: (BuilderContext context) {
	return Center(
		child: Text()
	    );
    },
)
```

## Campo de texto(Textfield)
Para agregar un _título_ necesitamos usar `InputDecoration(labelText:)`.

Para establecer un teclado personalizado, usa `InputDecoration(keyboardType: (true|false))`.

Para manejar la contraseña usa `InputDecoration(obscureText: (true|false)`.

Para obtener el valor `onChanged: (valor) {}`. Para monitorear el valor necesitas un `StatefulWidget`.

## Barra de aplicación(AppBar)
El componente AppBar te permite establecer _título_, _retroceso_ y _acciones_ para la barra de estado.
`title` contiene el título del widget.
`actions` es una matriz de widgets que se mantienen a la derecha.

## Gestos
Puedes convertir cualquier widget con una acción envolviéndolo dentro de `GestureDetector`.

## Teclado
Si necesitas ocultar un teclado abierto, necesitas usar `FocusScope`.

```dart
FocusScope.of(context).requestFocus(FocusNode());
```

Básicamente, falsificas el nodo de enfoque actual con uno nuevo no conectado a ningún formulario/área de texto.