---
title: Dart cheatsheet 
description: Interactively learn (or relearn) some of Dart's unique features.
js: [{url: '/assets/js/inject_dartpad.js', defer: true}]

---

El lenguaje Dart está diseñado para ser fácil de aprender para los programadores que vienen de otros lenguajes, pero tiene algunas características únicas. 
Este codelab te guía a través de las más importantes de estas características del lenguaje.

## Interpolación de cadenas

Para insertar el valor de una expresión dentro de una cadena, utiliza `${expresión}`. Si la expresión es un identificador, puedes omitir las `{}`.

Aquí tienes algunos ejemplos de uso de la interpolación de cadenas:

<div class="table-wrapper">

| Cadena                      | Resultado                             |
|-----------------------------|---------------------------------------|
| `'${3 + 2}'`                | `'5'`                                 |
| `'${"palabra".toUpperCase()}'` | `'PALABRA'`                          |
| `'$miObjeto'`               | El valor de `miObjeto.toString()`     |

</div>

#### Ejemplo de código

La siguiente función toma dos enteros como parámetros. Haz que devuelva una cadena que contenga ambos enteros separados por un espacio. Por ejemplo, `stringify(2, 3)` debería devolver `'2 3'`.

```dart
String stringify(int x, int y) {
  TODO('Devuelve una cadena formateada aquí');
}


// Prueba tu solución (¡No edites!): 
void main() {
  assert(stringify(2, 3) == '2 3',
      "Tu método stringify devolvió '${stringify(2, 3)}' en lugar de '2 3'");
  print('¡Éxito!');
}
```

<details>
  <summary>Solución para el ejemplo de interpolación de cadenas</summary>

  Tanto `x` como `y` son valores simples, y la interpolación de cadenas de Dart se encargará de convertirlos a representaciones de cadena. Todo lo que necesitas hacer es usar el operador `$` para referenciarlos dentro de comillas simples, con un espacio entre ellos:

  ```dart
  String stringify(int x, int y) {
    return '$x $y';
  }
  ```

</details>


## Variables anulables

Dart aplica la seguridad de nulos de manera sólida. Esto significa que los valores no pueden ser nulos a menos que indiques que pueden serlo. En otras palabras, los tipos por defecto son no anulables.

Por ejemplo, considera el siguiente código. Con la seguridad de nulos, este código devuelve un error. Una variable de tipo `int` no puede tener el valor `null`:

```dart
int a = [!null!]; // INVÁLIDO.
```

Al crear una variable, agrega `?` al tipo para indicar que la variable puede ser `null`:

```dart
[!int?!] a = null; // Válido.
```

Puedes simplificar ese código un poco porque, en todas las versiones de Dart, `null` es el valor predeterminado para las variables no inicializadas:

```dart
int? a; // El valor inicial de a es null.
```

Para obtener más información sobre la seguridad de nulos en Dart, lee la [guía de seguridad de nulos](/null-safety).

#### Ejemplo de código

Intenta declarar dos variables a continuación:
- Una cadena anulable llamada `nombre` con el valor `'Jane'`.
- Una cadena anulable llamada `dirección` con el valor `null`.

Ignora todos los errores iniciales en DartPad.

```dart
// TODO: Declara las dos variables aquí


// Prueba tu solución (¡No edites!): 
void main() {
  try {
    if (nombre == 'Jane' && dirección == null) {
      // Verifica que "nombre" sea anulable
      nombre = null;
      print('¡Éxito!');
    } else {
      print('¡No del todo correcto, inténtalo de nuevo!');
    }
  } catch (e) {
    print('Excepción: ${e.runtimeType}');
  }
}
```

<details>
  <summary>Solución para el ejemplo de variables anulables</summary>

  Declara las dos variables como `String` seguido de `?`. Luego, asigna `'Jane'` a `nombre` y deja `dirección` sin inicializar:

  ```dart
  String? nombre = 'Jane';
  String? dirección;
  ```

</details>


## Operadores sensibles a nulos

Dart ofrece algunos operadores útiles para manejar valores que podrían ser nulos. Uno de ellos es el operador de asignación `??=`, que asigna un valor a una variable solo si esa variable es actualmente nula:


```dart
int? a; // = null
a ??= 3;
print(a); // <-- Imprime 3.

a ??= 5;
print(a); // <-- Todavía imprime 3.
```

Otro operador sensible a nulos es `??`, que devuelve la expresión a su izquierda a menos que el valor de esa expresión sea nulo, en cuyo caso evalúa y devuelve la expresión a su derecha:

```dart
print(1 ?? 3); // <-- Imprime 1.
print(null ?? 12); // <-- Imprime 12.
```

#### Ejemplo de código

Intenta sustituir en los operadores `??=` y `??` para implementar el comportamiento descrito en el siguiente fragmento de código.

Ignora todos los errores iniciales en DartPad.

```dart:run-dartpad:height-255px:ga_id-null_aware
String? foo = 'una cadena';
String? bar; // = null

// Sustituye un operador que haga que 'una cadena' se asigne a baz.
String? baz = foo /* TODO */ bar;

void updateSomeVars() {
  // Sustituye un operador que haga que 'una cadena' se asigne a bar.
  bar /* TODO */ 'una cadena';
}


// Prueba tu solución (¡No edites!):
void main() {
  try {
    updateSomeVars();
    
    if (foo != 'una cadena') {
      print('Parece que foo de alguna manera terminó con el valor incorrecto.');
    } else if (bar != 'una cadena') {
      print('Parece que bar terminó con el valor incorrecto.');
    } else if (baz != 'una cadena') {
      print('Parece que baz terminó con el valor incorrecto.');
    } else {
      print('¡Éxito!');
    }
  } catch (e) {
    print('Excepción: ${e.runtimeType}.');
  }
  
}
```

<details>
  <summary>Solución para el ejemplo de operadores sensibles a nulos</summary>

  Todo lo que necesitas hacer en este ejercicio es reemplazar los comentarios `TODO` con `??=` o `??`. Lee el texto anterior para

 asegurarte de entender ambos y luego inténtalo:

  ```dart
  // Sustituye un operador que haga que 'una cadena' se asigne a baz.
  String? baz = foo ?? bar;
  
  void updateSomeVars() {
    // Sustituye un operador que haga que 'una cadena' se asigne a bar.
    bar ??= 'una cadena';
  }
  ```

</details>


## Acceso condicional a propiedades

Para proteger el acceso a una propiedad o método de un objeto que podría ser nulo, coloca un signo de interrogación (`?`) antes del punto (`.`):

```dart
miObjeto?.algunaPropiedad
```
El código anterior es equivalente a lo siguiente:
```dart
(miObjeto != null) ? miObjeto.algunaPropiedad : null
```
Puedes encadenar múltiples usos de `?.` en una sola expresión:
```dart
miObjeto?.algunaPropiedad?.algúnMétodo()
```

El código anterior devuelve null (y nunca llama a `algúnMétodo()`) si tanto `miObjeto` como `miObjeto.algunaPropiedad` son null.

#### Ejemplo de código

La siguiente función toma una cadena anulable como parámetro. Intenta usar el acceso condicional a propiedades para hacer que devuelva la versión en mayúsculas de `str`, o `null` si `str` es `null`.

```dart
String? upperCaseIt(String? str) {
  // TODO: Intenta acceder condicionalmente al método `toUpperCase` aquí.
}


// Prueba tu solución (¡No edites!):
void main() {
  try {
    String? one = upperCaseIt(null);
    if (one != null) {
      print('Parece que no estás devolviendo null para entradas nulas.');
    } else {
      print('¡Éxito cuando str es null!');
    }
  } catch (e) {
    print('Se intentó llamar a upperCaseIt(null) y se produjo una excepción: \n ${e.runtimeType}.');
  }
  
  try {
    String? two = upperCaseIt('una cadena');
    if (two == null) {
      print('Parece que estás devolviendo null incluso cuando str tiene un valor.');
    } else if (two != 'UNA CADENA') {
      print('Se intentó upperCaseIt(\'una cadena\'), pero no se recibió \'UNA CADENA\' como respuesta.');
    } else {
      print('¡Éxito cuando str no es null!');
    }
  } catch (e) {
    print('Se intentó llamar a upperCaseIt(\'una cadena\') y se produjo una excepción: \n ${e.runtimeType}.');
  }
}
```

<details>
  <summary>Solución para el ejemplo de acceso condicional a propiedades</summary>

  Si este ejercicio quisiera que convirtieras condicionalmente una cadena a minúsculas, podrías hacerlo así: `str?.toLowerCase()`. ¡Usa el método equivalente para convertir una cadena a mayúsculas!

  ```dart
  String? upperCaseIt(String? str) {
    return str?.toUpperCase();
  }
  ```

</details>

## Literales de colección

Dart tiene soporte incorporado para listas, mapas y conjuntos. Puedes crearlos usando literales:

```dart
final unaListaDeCadenas = ['uno', 'dos', 'tres'];
final unConjuntoDeCadenas = {'uno', 'dos', 'tres'};
final unMapaDeCadenasAEnteros = {
  'uno': 1,
  'dos': 2,
  'tres': 3,
};
```

La inferencia de tipos de Dart puede asignar tipos a estas variables por ti. En este caso, los tipos inferidos son `List<String>`, `Set<String>` y `Map<String, int>`.

O puedes especificar el tipo tú mismo:


```dart
final unaListaDeEnteros = <int>[];
final unConjuntoDeEnteros = <int>{};
final unMapaDeEnterosADobles = <int, double>{};
```

Especificar tipos es útil cuando inicializas una lista con contenidos de un subtipo, pero aún quieres que la lista sea `List<BaseType>`:

```dart
final unaListaDeTipoBase = <BaseType>[SubTipo(), SubTipo()];
```

#### Ejemplo de código

Intenta establecer las siguientes variables en los valores indicados. Reemplaza los valores nulos existentes.

```dart
// Asigna una lista que contenga 'a', 'b' y 'c' en ese orden:
final unaListaDeCadenas = null;

// Asigna un conjunto que contenga 3, 4 y 5:
final unConjuntoDeEnteros = null;

// Asigna un mapa de String a int para que aMapOfStringsToInts['miClave'] devuelva 12:
final unMapaDeCadenasAEnteros = null;

// Asigna una Lista<double> vacía:
final unaListaVaciaDeDobles = null;

// Asigna un Set<String> vacío:
final unConjuntoVacioDeCadenas = null;

// Asigna un Map<double, int> vacío:
final unMapaVacioDeDoblesAEnteros = null;


// Prueba tu solución (¡No edites!):
void main() {
  final errores = <String>[];
  
  if (unaListaDeCadenas is! List<String>) {
    errores.add('unaListaDeCadenas debería tener el tipo List<String>.');
  } else if (unaListaDeCadenas.length != 3) {
    errores.add('unaListaDeCadenas tiene ${unaListaDeCadenas.length} elementos, \n en lugar de los 3 esperados.');
  } else if (unaListaDeCadenas[0] != 'a' || unaListaDeCadenas[1] != 'b' || unaListaDeCadenas[2] != 'c') {
    errores.add('unaListaDeCadenas no contiene los valores correctos (\'a\', \'b\', \'c\').');
  }

  if (unConjuntoDeEnteros is! Set<int>) {
    errores.add('unConjuntoDeEnteros debería tener el tipo Set<int>.');
  } else if (unConjuntoDeEnteros.length != 3) {
    errores.add('unConjuntoDeEnteros tiene ${unConjuntoDeEnteros.length} elementos, \n en lugar de los 3 esperados.');
  } else if (!unConjuntoDeEnteros.contains(3) || !unConjuntoDeEnteros.contains(4) || !unConjuntoDeEnteros.contains(5)) {
    errores.add('unConjuntoDeEnteros no contiene los valores correct

os (3, 4, 5).');
  }

  if (unMapaDeCadenasAEnteros is! Map<String, int>) {
    errores.add('unMapaDeCadenasAEnteros debería tener el tipo Map<String, int>.');
  } else if (unMapaDeCadenasAEnteros['miClave'] != 12) {
    errores.add('unMapaDeCadenasAEnteros no contiene los valores correctos (\'miClave\': 12).');
  }

  if (unaListaVaciaDeDobles is! List<double>) {
    errores.add('unaListaVaciaDeDobles debería tener el tipo List<double>.');
  } else if (unaListaVaciaDeDobles.isNotEmpty) {
    errores.add('unaListaVaciaDeDobles debería estar vacía.');
  }

  if (unConjuntoVacioDeCadenas is! Set<String>) {
    errores.add('unConjuntoVacioDeCadenas debería tener el tipo Set<String>.');
  } else if (unConjuntoVacioDeCadenas.isNotEmpty) {
    errores.add('unConjuntoVacioDeCadenas debería estar vacío.');
  }

  if (unMapaVacioDeDoblesAEnteros is! Map<double, int>) {
    errores.add('unMapaVacioDeDoblesAEnteros debería tener el tipo Map<double, int>.');
  } else if (unMapaVacioDeDoblesAEnteros.isNotEmpty) {
    errores.add('unMapaVacioDeDoblesAEnteros debería estar vacío.');
  }

  if (errores.isEmpty) {
    print('¡Éxito!');
  } else {
    errores.forEach(print);
  }

  // Ignora el chequeo innecesario del tipo
}
```

<details>
  <summary>Solución para el ejemplo de literales de colección</summary>

  Añade un literal de lista, conjunto o mapa después de cada signo igual. Recuerda especificar los tipos para las declaraciones vacías, ya que no se pueden inferir.

  ```dart
  // Asigna una lista que contenga 'a', 'b' y 'c' en ese orden:
  final unaListaDeCadenas = ['a', 'b', 'c'];

  // Asigna un conjunto que contenga 3, 4 y 5:
  final unConjuntoDeEnteros = {3, 4, 5};

  // Asigna un mapa de String a int para que aMapOfStringsToInts['miClave'] devuelva 12:
  final unMapaDeCadenasAEnteros = {'miClave': 12};

  // Asigna una Lista<double> vacía:
  final unaListaVaciaDeDobles = <double>[];

  // Asigna un Set<String> vacío:
  final unConjuntoVacioDeCadenas = <String>{};

  // Asigna un Map<double, int> vacío:
  final unMapaVacioDeDoblesAEnteros = <double, int>{};
  ```

</details>

## Sintaxis de flecha

Puede que hayas visto el símbolo `=>` en el código de Dart. Esta sintaxis de flecha es una forma de definir una función que ejecuta la expresión a su derecha y devuelve su valor.

Por ejemplo, considera esta llamada al método `any()` de la clase `List`:

```dart
bool tieneVacio = unaListaDeCadenas.any((s) {
  return s.isEmpty;
});
```

Aquí tienes una forma más simple de escribir ese código:

```dart
bool tieneVacio = unaListaDeCadenas.any((s) => s.isEmpty);
```

#### Ejemplo de código

Intenta completar las siguientes declaraciones, que utilizan la sintaxis de flecha.

```dart
class MiClase {
  int valor1 = 2;
  int valor2 = 3;
  int valor3 = 5;
  
  // Devuelve el producto de los valores anteriores:
  int get producto => TODO();
  
  // Añade 1 a valor1:
  void incrementaValor1() => TODO();
  
  // Devuelve una cadena que contenga cada elemento de la lista, separado por comas (por ejemplo, 'a,b,c'): 
  String unirConComas(List<String> cadenas) => TODO();
}


// Prueba tu solución (¡No edites!):
void main() {
  final obj = MiClase();
  final errores = <String>[];
  
  try {
    final producto = obj.producto;
    
    if (producto != 30) {
      errores.add('La propiedad producto devolvió $producto \n en lugar del valor esperado (30).'); 
    } 
  } catch (e) {
    print('Se intentó usar MiClase.producto, pero se encontró una excepción: \n ${e.runtimeType}.');
    return;
  }

  try {
    obj.incrementaValor1();
    
    if (obj.valor1 != 3) {
      errores.add('Después de llamar a incrementaValor, valor1 fue ${obj.valor1} \n en lugar del valor esperado (3).'); 
    } 
  } catch (e) {
    print('Se intentó usar MiClase.incrementaValor1, pero se encontró una excepción: \n ${e.runtimeType}.');
    return;
  }

  try {
    final unido = obj.unirConComas(['uno', 'dos', 'tres']);
    
    if (unido != 'uno,dos,tres') {
      errores.add('Se intentó llamar a unirConComas([\'uno\', \'dos\', \'tres\']) \n y se recibió $unido en lugar del valor esperado (\'uno,dos,tres\').'); 
    } 
  } catch (e) {
    print('Se intentó usar MiClase.unirConComas, pero se encontró una excepción: \n ${e.runtimeType}.');
   

 return;
  }

  if (errores.isEmpty) {
    print('¡Éxito!');
  } else {
    errores.forEach(print);
  }
  
  // Ignora el chequeo innecesario del tipo
}
```

<details>
  <summary>Solución para el ejemplo de sintaxis de flecha</summary>

  Completa cada método con una expresión utilizando la sintaxis de flecha.

  ```dart
  class MiClase {
    int valor1 = 2;
    int valor2 = 3;
    int valor3 = 5;
    
    // Devuelve el producto de los valores anteriores:
    int get producto => valor1 * valor2 * valor3;
    
    // Añade 1 a valor1:
    void incrementaValor1() => valor1++;
    
    // Devuelve una cadena que contenga cada elemento de la lista, separado por comas (por ejemplo, 'a,b,c'): 
    String unirConComas(List<String> cadenas) => cadenas.join(',');
  }
  ```

</details>
```dart
<details>
  <summary>Solución para el ejemplo de la sintaxis de flecha</summary>

  Para el producto, puedes usar `*` para multiplicar los tres valores juntos.
  Para `incrementValue1`, puedes usar el operador de incremento (`++`).
  Para `joinWithCommas`, usa el método `join` que se encuentra en la clase `List`.

  ```dart
  class MyClass {
    int value1 = 2;
    int value2 = 3;
    int value3 = 5;

    // Devuelve el producto de los valores anteriores:
    int get product => value1 * value2 * value3;
    
    // Añade 1 a value1:
    void incrementValue1() => value1++; 
    
    // Devuelve una cadena que contiene cada elemento de la
    // lista, separados por comas (por ejemplo, 'a,b,c'): 
    String joinWithCommas(List<String> strings) => strings.join(',');
  }
  ```
</details>


## Cascadas

Para realizar una secuencia de operaciones en el mismo objeto, utiliza cascadas (`..`).
Todos hemos visto una expresión como esta:
```dart
miObjeto.algunMetodo()
```

Invoca `algunMetodo()` en `miObjeto`, y el resultado de
la expresión es el valor de retorno de `algunMetodo()`.

Aquí está la misma expresión con una cascada:

```dart
miObjeto..algunMetodo()
```

Aunque aún invoca `algunMetodo()` en `miObjeto`, el resultado
de la expresión **no** es el valor de retorno, ¡es una referencia a `miObjeto`!

Usando cascadas, puedes encadenar operaciones que
de lo contrario requerirían declaraciones separadas.
Por ejemplo, considera el siguiente código,
que utiliza el operador de acceso de miembro condicional (`?.`)
para leer propiedades de `button` si no es `null`:

```dart
var button = querySelector('#confirm');
button?.text = 'Confirmar';
button?.classes.add('importante');
button?.onClick.listen((e) => window.alert('¡Confirmado!'));
button?.scrollIntoView();
```

Para usar cascadas en su lugar, 
puedes comenzar con la cascada de _omitir nulos_ (`?..`), 
que garantiza que ninguna de las operaciones en cascada
se intente en un objeto `null`.
Usar cascadas acorta el código
y hace que la variable `button` sea innecesaria:

```dart
querySelector('#confirm')
  ?..text = 'Confirmar'
  ..classes.add('importante')
  ..onClick.listen((e) => window.alert('¡Confirmado!'))
  ..scrollIntoView();
```

#### Ejemplo de código 

Usa cascadas para crear una sola instrucción que
establezca las propiedades `anInt`, `aString` y `aList` de un `BigObject`
en `1`, `'¡String!'`, y `[3.0]` (respectivamente)
y luego llama a `allDone()`.

```dart
class BigObject {
  int anInt = 0;
  String aString = '';
  List<double> aList = [];
  bool _done = false;
  
  void allDone() {
    _done = true;
  }
}

BigObject fillBigObject(BigObject obj) {
  // Crea una única instrucción que actualizará y devolverá obj:
  return TODO('obj..');
}


// Prueba tu solución (¡No edites!):
void main() {
  BigObject obj;

  try {
    obj = fillBigObject(BigObject());
  } catch (e) {
    print('Atrapado una excepción de tipo ${e.runtimeType} \n mientras se ejecutaba fillBigObject');
    return;
  }

  final errs = <String>[];

  if (obj.anInt != 1) {
    errs.add(
        'El valor de anInt fue ${obj.anInt} \n en lugar del esperado (1).');
  }

  if (obj.aString != '¡String!') {
    errs.add(
        'El valor de aString fue \'${obj.aString}\' \n en lugar del esperado (\'¡String!\').');
  }

  if (obj.aList.length != 1) {
    errs.add(
        'La longitud de aList fue ${obj.aList.length} \n en lugar del valor esperado (1).');
  } else {
    if (obj.aList[0] != 3.0) {
      errs.add(
          'El valor encontrado en aList fue ${obj.aList[0]} \n en lugar del esperado (3.0).');
    }
  }
  
  if (!obj._done) {
    errs.add('Parece que no se llamó a allDone().');
  }

  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de cascadas</summary>

  La mejor solución para este ejercicio comienza con `obj..` y
  tiene cuatro operaciones de asignación encadenadas.
  Comienza con `return obj..anInt = 1`,
  luego agrega otra cascada (`..`) y comienza la siguiente asignación.

  ```dart
  BigObject fillBigObject(BigObject obj) {
    return obj
      ..anInt = 1
      ..aString = '¡String!'
      ..aList.add(3)
      ..allDone();
  }
  ```
</details>


## Getters y setters

Puedes definir getters y setters
cuando necesites más control sobre una propiedad
de lo que permite un campo simple.

Por ejemplo, puedes asegurarte de que el valor de una propiedad sea válido:


```dart
class MyClass {
  int _unaPropiedad = 0;

  int get unaPropiedad => _unaPropiedad;

  set unaPropiedad(int valor) {
    if (valor >= 0) {
      _unaPropiedad = valor;
    }
  }
}
```

También puedes usar un getter para definir una propiedad calculada:


```dart
class MyClass {
  final List<int> _valores = [];

  void agregarValor(int valor) {
    _valores.add(valor);
  }

  // Una propiedad calculada.
  int get cuenta {
    return _valores.length;
  }
}
```

#### Ejemplo de código 

Imagina que tienes una clase de carrito de compras que mantiene una `List<double>`
privada de precios.
Añade lo siguiente:

* Un getter llamado `total` que devuelve la suma de los precios
* Un setter que reemplace la lista con una nueva,
  siempre y cuando la nueva lista no contenga precios negativos
  (en cuyo caso el setter debería lanzar una `InvalidPriceException`).

Ignora todos los errores iniciales en el DartPad.

```dart
class InvalidPriceException {}



class ShoppingCart {
  List<double> _precios = [];
  
  // TODO: Agrega un getter "total" aquí:

  // TODO: Agrega un setter "precios" aquí:
}


// Prueba tu solución (¡No edites!):
void main() {
  var encontróExcepción = false;
  
  try {
    final carrito = ShoppingCart();
    carrito.precios = [12.0, 12.0, -23.0];
  } on InvalidPriceException {
    encontróExcepción = true;
  } catch (e) {
    print('Intentó establecer un precio negativo y recibió un ${e.runtimeType} \n en lugar de una InvalidPriceException.');
    return;
  }
  
  if (!encontróExcepción) {
    print('Intentó establecer un precio negativo \n y no recibió una InvalidPriceException.');
    return;
  }
  
  final segundoCarrito = ShoppingCart();
  
  try {
    segundoCarrito.precios = [1.0, 2.0, 3.0];
  } catch(e) {
    print('Intentó establecer precios con una lista válida, \n pero recibió una excepción: ${e.runtimeType}.');
    return;
  }
  
  if (segundoCarrito._precios.length != 3) {
    print('Intentó establecer precios con una lista de tres valores, \n pero _precios terminó teniendo una longitud de ${segundoCarrito._precios.length}.');
    return;
  }

  if (segundoCarrito._precios[0] != 1.0 || segundoCarrito._precios[1] != 2.0 || segundoCarrito._precios[2] != 3.0) {
    final vals = segundoCarrito._precios.map((p) => p.toString()).join(', ');
    print('Intentó establecer precios con una lista de tres valores (1, 2, 3), \n pero valores incorrectos terminaron en la lista de precios ($vals) .');
    return;
  }
  
  var suma = 0.0;
  
  try {
    suma = segundoCarrito.total;
  } catch (e) {
    print('Intentó obtener el total, pero recibió una excepción: ${e.runtimeType}.');
    return;
  }
  
  if (suma != 6.0) {
    print('Después de establecer los precios en (1, 2, 3), el total devolvió $suma en lugar de 6.');
    return;
  }
  
  print('¡Éxito!');
}
```

<details>
  <summary>Solución para el ejemplo de getters y setters</summary>

  Dos funciones son útiles para este ejercicio. 
  Una es `fold`, que puede reducir una lista a un solo valor
  (úsala para calcular el total).
  La otra es `any`, que puede verificar cada elemento en una lista
  con una función que le proporcionas
  (úsala para verificar si hay precios negativos en el setter de precios).

  ```dart
  // Agrega un getter "total" aquí:
  double get total => _precios.fold(0, (e, t) => e + t);

  // Agrega un setter "precios" aquí:
  set precios(List<double> valor) {
    if (valor.any((p) => p < 0)) {
      throw InvalidPriceException();
    }
    
    _precios = valor;
  }
  ```

</details>


## Parámetros posicionales opcionales

Dart tiene dos tipos de parámetros de función: posicionales y nombrados. 
Los parámetros posicionales son el tipo con el que probablemente estés familiarizado:


```dart
int suma(int a, int b, int c) {
  return a + b + c;
}
// ···
  int total = suma(1, 2, 3);
```

Con Dart, puedes hacer que estos parámetros posicionales sean opcionales envolviéndolos entre corchetes:


```dart
int sumaHastaCinco(int a, [int? b, int? c, int? d, int? e]) {
  int suma = a;
  if (b != null) suma += b;
  if (c != null) suma += c;
  if (d != null) suma += d;
  if (e != null) suma += e;
  return suma;
}
// ···
  int total = sumaHastaCinco(1, 2);
  int otroTotal = sumaHastaCinco(1, 2, 3, 4, 5);
```

Los parámetros posicionales opcionales siempre están al final
en la lista de parámetros de una función.
Su valor predeterminado es `null` a menos que proporciones otro valor predeterminado:

```dart
int sumaHastaCinco(int a, [int b = 2, int c = 3, int d = 4, int e = 5]) {
// ···
}
// ···
  int nuevoTotal = sumaHastaCinco(1);
  print(nuevoTotal); // <-- imprime 15
```

#### Ejemplo de código 

Implementa una función llamada `unirConComas()` que acepte de uno a
cinco enteros, luego devuelva una cadena de esos números separados por comas.
Aquí hay algunos ejemplos de llamadas a funciones y valores devueltos:

| Llamada a la función                   | Valor devuelto |
|---------------------------------|----------------|
| `unirConComas(1)`             | `'1'`          |
| `unirConComas(1, 2, 3)`       | `'1,2,3'`      |
| `unirConComas(1, 1, 1, 1, 1)` | `'1,1,1,1,1'`  |

<br>

```dart
String unirConComas(int a, [int? b, int? c, int? d, int? e]) {
  return TODO();
}


// Prueba tu solución (¡No edites!):
void main() {
  final errs = <String>[];
  
  try {
    final valor = unirConComas(1);
    
    if (valor != '1') {
      errs.add('Intentó llamar a unirConComas(1) \n y obtuvo $valor en lugar del esperado (\'1\').'); 
    } 
  } on UnimplementedError {
    print('Intentó llamar a unirConComas pero falló. \n ¿Implementaste el método?');
    return;
  } catch (e) {
    print('Intentó llamar a unirConComas(1), \n pero se encontró con una excepción: ${e.runtimeType}.');
    return;
  }

  try {
    final valor = unirConComas(1, 2, 3);


    
    if (valor != '1,2,3') {
      errs.add('Intentó llamar a unirConComas(1, 2, 3) \n y obtuvo $valor en lugar del esperado (\'1,2,3\').'); 
    } 
  } on UnimplementedError {
    print('Intentó llamar a unirConComas pero falló. \n ¿Implementaste el método?');
    return;
  } catch (e) {
    print('Intentó llamar a unirConComas(1, 2 ,3), \n pero se encontró con una excepción: ${e.runtimeType}.');
    return;
  }

  try {
    final valor = unirConComas(1, 2, 3, 4, 5);
    
    if (valor != '1,2,3,4,5') {
      errs.add('Intentó llamar a unirConComas(1, 2, 3, 4, 5) \n y obtuvo $valor en lugar del esperado (\'1,2,3,4,5\').'); 
    } 
  } on UnimplementedError {
    print('Intentó llamar a unirConComas pero falló. \n ¿Implementaste el método?');
    return;
  } catch (e) {
    print('Intentó llamar a unirConComas(1, 2, 3, 4 ,5), \n pero se encontró con una excepción: ${e.runtimeType}.');
    return;
  }

  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de parámetros posicionales opcionales</summary>

  Los parámetros `b`, `c`, `d` y `e` son `null` si no son proporcionados por el
  llamador. Lo importante, entonces, es verificar si esos argumentos son `null`
  antes de agregarlos a la cadena final.

  ```dart
  String unirConComas(int a, [int? b, int? c, int? d, int? e]) {
    var total = '$a';
    if (b != null) total = '$total,$b';
    if (c != null) total = '$total,$c';
    if (d != null) total = '$total,$d';
    if (e != null) total = '$total,$e';
    return total;
  }
  ```
</details>

<a id="optional-named-parameters"></a>

## Parámetros nombrados opcionales

Usando una sintaxis de llaves al final de la lista de parámetros,
puedes definir parámetros que tengan nombres.

Los parámetros nombrados son opcionales
a menos que estén marcados explícitamente como `required`.

```dart
void imprimirNombre(String nombre, String apellido, {String? segundoNombre}) {
  print('$nombre ${segundoNombre ?? ''} $apellido');
}
// ···
  imprimirNombre('Dash', 'Dartisan');
  imprimirNombre('John', 'Smith', segundoNombre: 'Who');
  // Los argumentos nombrados pueden colocarse en cualquier lugar de la lista de argumentos
  imprimirNombre('John', segundoNombre: 'Who', 'Smith');
```

Como podrías esperar,
el valor predeterminado de un parámetro nombrado nullable es `null`,
pero puedes proporcionar un valor predeterminado personalizado.

Si el tipo de un parámetro es no nulo,
entonces debes proporcionar un valor predeterminado
(como se muestra en el siguiente código)
o marcar el parámetro como `required`
(como se muestra en la
[sección del constructor](#using-this-in-a-constructor)).

```dart
void imprimirNombre(String nombre, String apellido, {String segundoNombre[! = ''!]}) {
  print('$nombre $segundoNombre $apellido');
}
```

Una función no puede tener tanto parámetros posicionales opcionales como nombrados.

### Ejemplo de código

Agrega un método de instancia `copyWith()` a la clase `MyDataObject`. Debería tomar tres parámetros con nombre y opcionales:

- `int? newInt`
- `String? newString`
- `double? newDouble`

Tu método `copyWith()` debería devolver un nuevo `MyDataObject` basado en la instancia actual, con los datos de los parámetros anteriores (si los hay) copiados en las propiedades del objeto. Por ejemplo, si `newInt` no es nulo, entonces copia su valor en `anInt`.

Ignora todos los errores iniciales en el DartPad.

```dart
class MyDataObject {
  final int anInt;
  final String aString;
  final double aDouble;

  MyDataObject({
     this.anInt = 1,
     this.aString = '¡Antiguo!',
     this.aDouble = 2.0,
  });

  // TODO: Agrega tu método copyWith aquí:
}


// Prueba tu solución (¡No edites!):
void main() {
  final source = MyDataObject();
  final errs = <String>[];
  
  try {
    final copy = source.copyWith(newInt: 12, newString: 'Nuevo!', newDouble: 3.0);
    
    if (copy.anInt != 12) {
      errs.add('Se llamó a copyWith(newInt: 12, newString: \'Nuevo!\', newDouble: 3.0), \n y el anInt del nuevo objeto fue ${copy.anInt} en lugar del valor esperado (12).');
    }
    
    if (copy.aString != 'Nuevo!') {
      errs.add('Se llamó a copyWith(newInt: 12, newString: \'Nuevo!\', newDouble: 3.0), \n y el aString del nuevo objeto fue ${copy.aString} en lugar del valor esperado (\'Nuevo!\').');
    }
    
    if (copy.aDouble != 3) {
      errs.add('Se llamó a copyWith(newInt: 12, newString: \'Nuevo!\', newDouble: 3.0), \n y el aDouble del nuevo objeto fue ${copy.aDouble} en lugar del valor esperado (3).');
    }
  } catch (e) {
    print('Se llamó a copyWith(newInt: 12, newString: \'Nuevo!\', newDouble: 3.0) \n y se obtuvo una excepción: ${e.runtimeType}');
  }
  
  try {
    final copy = source.copyWith();
    
    if (copy.anInt != 1) {
      errs.add('Se llamó a copyWith(), y el anInt del nuevo objeto fue ${copy.anInt} \n en lugar del valor esperado (1).');
    }
    
    if (copy.aString != '¡Antiguo!') {
      errs.add('Se llamó a copyWith(), y el aString del nuevo objeto fue ${copy.aString} \n en lugar del valor esperado (\'¡Antiguo!\').');
    }
    
    if (copy.aDouble != 2) {
      errs.add('Se llamó a copyWith(), y el aDouble del nuevo objeto fue ${copy.aDouble} \n en lugar del valor esperado (2).');
    }
  } catch (e) {
    print('Se llamó a copyWith() y se obtuvo una excepción: ${e.runtimeType}');
  }
  
  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de parámetros con nombre</summary>

  El método `copyWith()` aparece en muchas clases y bibliotecas. El tuyo debería hacer algunas cosas: usar parámetros con nombre opcionales, crear una nueva instancia de `MyDataObject` y usar los datos de los parámetros para llenarlo (o los datos de la instancia actual si los parámetros son nulos). ¡Esta es una oportunidad para practicar con el operador `??`!

  ```dart
    MyDataObject copyWith({int? newInt, String? newString, double? newDouble}) {
      return MyDataObject(
        anInt: newInt ?? this.anInt,
        aString: newString ?? this.aString,
        aDouble: newDouble ?? this.aDouble,
      );
    }
  ```
</details>


## Excepciones

El código Dart puede lanzar y capturar excepciones. A diferencia de Java, todas las excepciones de Dart son excepciones no verificadas. Los métodos no declaran qué excepciones podrían lanzar, y no estás obligado a capturar ninguna excepción.

Dart proporciona los tipos `Exception` y `Error`, pero puedes lanzar cualquier objeto que no sea nulo:


```dart
throw Exception('Algo malo ocurrió.');
throw '¡Waaaaaaah!';
```

Utiliza las palabras clave `try`, `on` y `catch` al manejar excepciones:

```dart
try {
  criarMásLlamas();
} on FueraDeLlamasException {
  // Una excepción específica
  comprarMásLlamas();
} on Exception catch (e) {
  // Cualquier otra cosa que sea una excepción
  print('Excepción desconocida: $e');
} catch (e) {
  // Sin tipo especificado, maneja todo
  print('Algo realmente desconocido: $e');
}
```

La palabra clave `try` funciona como en la mayoría de los otros lenguajes. Utiliza la palabra clave `on` para filtrar excepciones específicas por tipo y la palabra clave `catch` para obtener una referencia al objeto de excepción.

Si no puedes manejar completamente la excepción, utiliza la palabra clave `rethrow` para propagar la excepción:

```dart
try {
  criarMásLlamas();
} catch (e) {
  print('¡Solo estaba intentando criar llamas!');
  rethrow;
}
```

Para ejecutar código independientemente de si se lanza una excepción, utiliza `finally`:

```dart
try {
  criarMásLlamas();
} catch (e) {
  // ... manejar la excepción ...
} finally {
  // Siempre limpiar, incluso si se lanza una excepción.
  limpiarEstablosDeLlamas();
}
```

#### Ejemplo de código

Implementa `tryFunction()` a continuación. Debería ejecutar un método poco confiable y luego hacer lo siguiente:

- Si `untrustworthy()` lanza una `ExceptionWithMessage`, llama a `logger.logException` con el tipo de excepción y el mensaje (intenta usar `on` y `catch`).
- Si `untrustworthy()` lanza una `Exception`, llama a `logger.logException` con el tipo de excepción (intenta usar `on` para este caso).
- Si `untrustworthy()` lanza cualquier otro objeto, no capture la excepción.


- Después de que todo esté capturado y manejado, llama a `logger.doneLogging` (intenta usar `finally`).

```dart
typedef VoidFunction = void Function();

class ExceptionWithMessage {
  final String message;
  const ExceptionWithMessage(this.message);
}

// Llama a logException para registrar una excepción y a doneLogging cuando hayas terminado.
abstract class Logger {
  void logException(Type t, [String? msg]);
  void doneLogging();
}

void tryFunction(VoidFunction untrustworthy, Logger logger) {
  // Invocar este método puede causar una excepción.
  // TODO: Captura y maneja las excepciones usando try-on-catch-finally.
  untrustworthy();
}


// Prueba tu solución (¡No edites!):
class MyLogger extends Logger {
  Type? lastType;
  String lastMessage = '';
  bool done = false;
  
  void logException(Type t, [String? message]) {
    lastType = t;
    lastMessage = message ?? lastMessage;
  }
  
  void doneLogging() => done = true;  
}

void main() {
  final errs = <String>[];
  var logger = MyLogger();
  
  try {
    tryFunction(() => throw Exception(), logger);
  
    if ('${logger.lastType}' != 'Exception' && '${logger.lastType}' != '_Exception') {
      errs.add('Untrustworthy lanzó una Exception, pero se registró un tipo diferente: \n ${logger.lastType}.');
    }
    
    if (logger.lastMessage != '') {
      errs.add('Untrustworthy lanzó una Exception sin mensaje, pero se registró un mensaje \n de todos modos: \'${logger.lastMessage}\'.');
    }
    
    if (!logger.done) {
      errs.add('Untrustworthy lanzó una Exception, \n y doneLogging() no se llamó después.');
    }
  } catch (e) {
    print('Untrustworthy lanzó una excepción, y una excepción de tipo \n ${e.runtimeType} no fue manejada por tryFunction.');
  }
  
  logger = MyLogger();
  
  try {
    tryFunction(() => throw ExceptionWithMessage('¡Hey!'), logger);
  
    if (logger.lastType != ExceptionWithMessage) {
      errs.add('Untrustworthy lanzó una ExceptionWithMessage(\'¡Hey!\'), pero se \n registró un tipo diferente: ${logger.lastType}.');
    }
    
    if (logger.lastMessage != 'Hey!') {
      errs.add('Untrustworthy lanzó una ExceptionWithMessage(\'¡Hey!\'), pero se \n registró un mensaje diferente: \'${logger.lastMessage}\'.');
    }
    
    if (!logger.done) {
      errs.add('Untrustworthy lanzó una ExceptionWithMessage(\'¡Hey!\'), \n y doneLogging() no se llamó después.');
    }
  } catch (e) {
    print('Untrustworthy lanzó una ExceptionWithMessage(\'¡Hey!\'), \n y una excepción de tipo ${e.runtimeType} no fue manejada por tryFunction.');
  }
  
  logger = MyLogger();
  bool caughtStringException = false;

  try {
    tryFunction(() => throw 'Una Cadena', logger);
  } on String {
    caughtStringException = true;
  }

  if (!caughtStringException) {
    errs.add('Untrustworthy lanzó una cadena, y fue manejada incorrectamente dentro de tryFunction().');
  }
  
  logger = MyLogger();
  
  try {
    tryFunction(() {}, logger);
  
    if (logger.lastType != null) {
      errs.add('Untrustworthy no lanzó una Exception, \n pero de todos modos se registró uno: ${logger.lastType}.');
    }
    
    if (logger.lastMessage != '') {
      errs.add('Untrustworthy no lanzó una Exception sin mensaje, \n pero de todos modos se registró uno: \'${logger.lastMessage}\'.');
    }
    
    if (!logger.done) {
      errs.add('Untrustworthy no lanzó una Exception, \n pero doneLogging() no se llamó después.');
    }
  } catch (e) {
    print('Untrustworthy no lanzó una excepción, \n pero una excepción de tipo ${e.runtimeType} no fue manejada por tryFunction.');
  }
  
  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de excepciones</summary>

  Este ejercicio parece complicado, pero en realidad es un gran bloque `try`. Llama a `untrustworthy` dentro del `try`, y luego utiliza `on`, `catch` y `finally` para capturar excepciones y llamar a métodos en el registrador.

  ```dart
  void tryFunction(VoidFunction untrustworthy, Logger logger) {
    try {
      untrustworthy();
    } on ExceptionWithMessage catch (e) {
      logger.logException(e.runtimeType, e.message);
    } on Exception {
      logger.logException(Exception);
    } finally {
      logger.doneLogging();
    }
  }
  ```

</details>


## Uso de `this` en un constructor

Dart proporciona un atajo útil para asignar valores a propiedades en un constructor: utiliza `this.nombreDeLaPropiedad` al declarar el constructor:

```dart
class MiColor {
  int rojo;
  int verde;
  int azul;

  MiColor(this.rojo, this.verde, this.azul);
}

final color = MiColor(80, 80, 128);
```

Esta técnica también funciona para parámetros con nombre. Los nombres de las propiedades se convierten en los nombres de los parámetros:

```dart
class MiColor {
  ...

  MiColor({required this.rojo, required this.verde, required this.azul});
}

final color = MiColor(rojo: 80, verde: 80, azul: 80);
```

En el código anterior, `rojo`, `verde` y `azul` están marcados como `required` porque estos valores `int` no pueden ser nulos. Si agregas valores predeterminados, puedes omitir `required`:

```dart
MiColor([this.rojo = 0, this.verde = 0, this.azul = 0]);
// o
MiColor({this.rojo = 0, this.verde = 0, this.azul = 0});
```

#### Ejemplo de código

Agrega un constructor de una línea a `MyClass` que utilice la sintaxis `this.` para recibir y asignar valores para las tres propiedades de la clase.

```dart
class MyClass {
  final int unInt;
  final String unaString;
  final double unDouble;
  
  // TODO: Crea el constructor aquí.
}


// Prueba tu solución (¡No edites!):
void main() {
  final errs = <String>[];
  
  try {
    final obj = MyClass(1, 'dos', 3);
    
    if (obj.un

Int != 1) {
      errs.add('Se llamó a MyClass(1, \'dos\', 3) y se obtuvo un objeto con unInt de ${obj.unInt} \n en lugar del valor esperado (1).');
    }

    if (obj.unInt != 1) {
      errs.add('Se llamó a MyClass(1, \'dos\', 3) y se obtuvo un objeto con unaString de \'${obj.unaString}\' \n en lugar del valor esperado (\'dos\').');
    }

    if (obj.unInt != 1) {
      errs.add('Se llamó a MyClass(1, \'dos\', 3) y se obtuvo un objeto con unDouble de ${obj.unDouble} \n en lugar del valor esperado (3).');
    }
  } catch (e) {
    print('Se llamó a MyClass(1, \'dos\', 3) y se obtuvo una excepción \n de tipo ${e.runtimeType}.');
  }
  
  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de `this`</summary>

  Este ejercicio tiene una solución de una línea. Declara el constructor con `this.unInt`, `this.unaString` y `this.unDouble` como sus parámetros en ese orden.

  ```dart    
  MyClass(this.unInt, this.unaString, this.unDouble);
  ```

</details>

:::note
Este parece bastante fácil en comparación con los anteriores.
Ya lo hemos visto en el ejemplo de Excepciones,
y ya lo he utilizado en un ejemplo anterior.
¿Deberíamos moverlo más arriba? ¿O hacerlo más desafiante de alguna manera?
Quizás requerir tanto parámetros posicionales como nombrados opcionales (con valores predeterminados)?
:::

## Listas de inicialización

A veces, cuando implementas un constructor,
necesitas hacer algunas configuraciones antes de que se ejecute el cuerpo del constructor.
Por ejemplo, los campos finales deben tener valores
antes de que se ejecute el cuerpo del constructor.
Haz este trabajo en una lista de inicialización,
que va entre la firma del constructor y su cuerpo:

```dart
Point.fromJson(Map<String, double> json)
    : x = json['x']!,
      y = json['y']! {
  print('En Point.fromJson(): ($x, $y)');
}
```

La lista de inicialización también es un lugar práctico para poner afirmaciones,
que se ejecutan solo durante el desarrollo:

```dart
NonNegativePoint(this.x, this.y)
    : assert(x >= 0),
      assert(y >= 0) {
  print('Acabo de crear un NonNegativePoint: ($x, $y)');
}
```

#### Ejemplo de código

Completa el constructor `FirstTwoLetters` a continuación.
Utiliza una lista de inicialización para asignar los dos primeros caracteres en `word` a
las propiedades `letterOne` y `LetterTwo`.
Para obtener crédito adicional, agrega un `assert` para detectar palabras de menos de dos caracteres.

Ignora todos los errores iniciales en DartPad.

```dart
class FirstTwoLetters {
  final String letterOne;
  final String letterTwo;

  // TODO: Crea un constructor con una lista de inicialización aquí:
  FirstTwoLetters(String word)

}


// Prueba tu solución (¡No edites!):
void main() {
  final errs = <String>[];

  try {
    final result = FirstTwoLetters('My String');
    
    if (result.letterOne != 'M') {
      errs.add('Se llamó a FirstTwoLetters(\'My String\') y se obtuvo un objeto con \n letterOne igual a \'${result.letterOne}\' en lugar del valor esperado (\'M\').');
    }

    if (result.letterTwo != 'y') {
      errs.add('Se llamó a FirstTwoLetters(\'My String\') y se obtuvo un objeto con \n letterTwo igual a \'${result.letterTwo}\' en lugar del valor esperado (\'y\').');
    }
  } catch (e) {
    errs.add('Se llamó a FirstTwoLetters(\'My String\') y se obtuvo una excepción \n del tipo ${e.runtimeType}.');
  }

  bool caughtException = false;
  
  try {
    FirstTwoLetters('');
  } catch (e) {
    caughtException = true;
  }
  
  if (!caughtException) {
    errs.add('Se llamó a FirstTwoLetters(\'\') y no se obtuvo una excepción \n de la aserción fallida.');
  }
  
  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de listas de inicialización</summary>

  Se necesitan dos asignaciones:
  `letterOne` debería ser asignado `word[0]`,
  y `letterTwo` debería ser asignado `word[1]`.

  ```dart    
    FirstTwoLetters(String word)
        : assert(word.length >= 2),
          letterOne = word[0],
          letterTwo = word[1];
  ```
</details>

## Constructores con nombre

:::caution
Al igual que JavaScript, Dart no admite sobrecargas de métodos
(dos métodos con el mismo nombre pero firmas diferentes).
Para permitir que las clases tengan múltiples constructores,
Dart admite constructores con nombre:
:::

```dart
class Point {
  double x, y;

  Point(this.x, this.y);

  Point.origin()
      : x = 0,
        y = 0;
}
```

Para usar un constructor con nombre, llámalo usando su nombre completo:

```dart
final miPunto = Point.origin();
```

#### Ejemplo de código

Dale a la clase `Color` un constructor con nombre `Color.black`
que establezca las tres propiedades en cero.

Ignora todos los errores iniciales en DartPad.

```dart
class Color {
  int red;
  int green;
  int blue;
  
  Color(this.red, this.green, this.blue);

  // TODO: Crea un constructor con nombre llamado "Color.black" aquí:

}


// Prueba tu solución (¡No edites!):
void main() {
  final errs = <String>[];

  try {
    final result = Color.black();
    
    if (result.red != 0) {
      errs.add('Se llamó a Color.black() y se obtuvo un Color con rojo igual a \n ${result.red} en lugar del valor esperado (0).');
    }

    if (result.green != 0) {
      errs.add('Se llamó a Color.black() y se obtuvo un Color con verde igual a \n ${result.green} en lugar del valor esperado (0).');
    }

    if (result.blue != 0) {
  errs.add('Se llamó a Color.black() y se obtuvo un Color con azul igual a \n ${result.blue} en lugar del valor esperado (0).');
    }
  } catch (e) {
    print('Se llamó a Color.black() y se obtuvo una excepción del tipo \n ${e.runtimeType}.');
    return;
  }

  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de constructores con nombre</summary>

  La declaración para tu constructor debería comenzar con `Color.black(): `.
  En la lista de inicialización (después de los dos puntos), establece `red`, `green` y `blue` en `0`.

  ```dart    
    Color.black()
        : red = 0,
          green = 0,
          blue = 0;
  ```

</details>

## Constructores de fábrica

Dart admite constructores de fábrica,
que pueden devolver subtipos o incluso nulo.
Para crear un constructor de fábrica, usa la palabra clave `factory`:

```dart
class Square extends Shape {}

class Circle extends Shape {}

class Shape {
  Shape();

  factory Shape.fromTypeName(String typeName) {
    if (typeName == 'square') return Square();
    if (typeName == 'circle') return Circle();

    throw ArgumentError('Tipo $typeName no reconocido');
  }
}
```

#### Ejemplo de código

Completa el constructor de fábrica llamado `IntegerHolder.fromList`,
haciendo lo siguiente:

* Si la lista tiene **un** valor,
  crea un `IntegerSingle` con ese valor.
* Si la lista tiene **dos** valores,
  crea un `IntegerDouble` con los valores en orden.
* Si la lista tiene **tres** valores,
  crea un `IntegerTriple` con los valores en orden.


* De lo contrario, lanza un `Error`.

```dart
class IntegerHolder {
  IntegerHolder();
  
  // Implementa este constructor de fábrica.
  factory IntegerHolder.fromList(List<int> list) {
    TODO();
  }
}

class IntegerSingle extends IntegerHolder {
  final int a;
  IntegerSingle(this.a); 
}

class IntegerDouble extends IntegerHolder {
  final int a;
  final int b;
  IntegerDouble(this.a, this.b); 
}

class IntegerTriple extends IntegerHolder {
  final int a;
  final int b;
  final int c;
  IntegerTriple(this.a, this.b, this.c); 
}


// Prueba tu solución (¡No edites!):
void main() {
  final errs = <String>[];

  bool _throwed = false;
  try {
    IntegerHolder.fromList([]);
  } on UnimplementedError {
    print('La prueba falló. ¿Implementaste el método?');
    return;
  } on Error {
    _throwed = true;
  } catch (e) {
    print('Se llamó a IntegerSingle.fromList([]) y se obtuvo una excepción de \n tipo ${e.runtimeType}.');
    return;
  }
  
  if (!_throwed) {
    errs.add('Se llamó a IntegerSingle.fromList([]) y no se lanzó un Error.');
  } 

  try {
    final obj = IntegerHolder.fromList([1]);
    
    if (obj is! IntegerSingle) {
      errs.add('Se llamó a IntegerHolder.fromList([1]) y se obtuvo un objeto de tipo \n ${obj.runtimeType} en lugar de IntegerSingle.');
    } else {
      if (obj.a != 1) {
        errs.add('Se llamó a IntegerHolder.fromList([1]) y se obtuvo un IntegerSingle con \n un valor \'a\' de ${obj.a} en lugar del valor esperado (1).');
      }
    }
  } catch (e) {
    print('Se llamó a IntegerHolder.fromList([]) y se obtuvo una excepción de \n tipo ${e.runtimeType}.');
    return;
  }

  try {
    final obj = IntegerHolder.fromList([1, 2]);
    
    if (obj is! IntegerDouble) {
      errs.add('Se llamó a IntegerHolder.fromList([1, 2]) y se obtuvo un objeto de tipo \n ${obj.runtimeType} en lugar de IntegerDouble.');
    } else {
      if (obj.a != 1) {
        errs.add('Se llamó a IntegerHolder.fromList([1, 2]) y se obtuvo un IntegerDouble \n con un valor \'a\' de ${obj.a} en lugar del valor esperado (1).');
      }
      
      if (obj.b != 2) {
        errs.add('Se llamó a IntegerHolder.fromList([1, 2]) y se obtuvo un IntegerDouble \n con un valor \'b\' de ${obj.b} en lugar del valor esperado (2).');
      }
    }
  } catch (e) {
    print('Se llamó a IntegerHolder.fromList([1, 2]) y se obtuvo una excepción \n de tipo ${e.runtimeType}.');
    return;
  }

  try {
    final obj = IntegerHolder.fromList([1, 2, 3]);
    
    if (obj is! IntegerTriple) {
      errs.add('Se llamó a IntegerHolder.fromList([1, 2, 3]) y se obtuvo un objeto de tipo \n ${obj.runtimeType} en lugar de IntegerTriple.');
    } else {
      if (obj.a != 1) {
        errs.add('Se llamó a IntegerHolder.fromList([1, 2, 3]) y se obtuvo un IntegerTriple \n con un valor \'a\' de ${obj.a} en lugar del valor esperado (1).');
      }
      
      if (obj.b != 2) {
        errs.add('Se llamó a IntegerHolder.fromList([1, 2, 3]) y se obtuvo un IntegerTriple \n con un valor \'a\' de ${obj.b} en lugar del valor esperado (2).');
      }

      if (obj.c != 3) {
        errs.add('Se llamó a IntegerHolder.fromList([1, 2, 3]) y se obtuvo un IntegerTriple \n con un valor \'a\' de ${obj.b} en lugar del valor esperado (2).');
      }
    }
  } catch (e) {
    print('Se llamó a IntegerHolder.fromList([1, 2, 3]) y se obtuvo una excepción \n de tipo ${e.runtimeType}.');
    return;
  }

  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de constructores de fábrica</summary>

  Dentro del constructor de fábrica,
  verifica la longitud de la lista, luego crea y devuelve un
  `IntegerSingle`, `IntegerDouble` o `IntegerTriple` según corresponda.

  ```dart    
    factory IntegerHolder.fromList(List<int> list) {
      if (list.length == 1) {
        return IntegerSingle(list[0]);
      } else if (list.length == 2) {
        return IntegerDouble(list[0], list[1]);
      } else if (list.length == 3) {
        return IntegerTriple(list[0], list[1], list[2]);
      } else {
        throw Error();
      } 
    }
  ```

</details>

## Constructores de redirección

A veces, el único propósito de un constructor es redirigir a
otro constructor en la misma clase.
El cuerpo de un constructor de redirección está vacío,
con la llamada al constructor apareciendo después de dos puntos (`:`).

```dart
class Automóvil {
  String marca;
  String modelo;
  int mpg;

  // El constructor principal para esta clase.
  Automóvil(this.marca, this.modelo, this.mpg);

  // Delega al constructor principal.
  Automóvil.híbrido(String marca, String modelo) : this(marca, modelo, 60);

  // Delega a un constructor con nombre
  Automóvil.híbridoElegante() : this.híbrido('Futuroauto', 'Mark 2');
}
```

#### Ejemplo de código

¿Recuerdas la clase `Color` de arriba? Crea un constructor con nombre llamado
`black`, pero en lugar de asignar manualmente las propiedades, redirígelo al
constructor predeterminado con ceros como argumentos.

Ignora todos los errores iniciales en DartPad.

```dart
class Color {
  int red;
  int green;
  int blue;
  
  Color(this.red, this.green, this.blue);

  // TODO: Crea un constructor con nombre llamado "black" aquí
  // y redirígelo para llamar al constructor existente
}


// Prueba tu

 solución (¡No edites!):
void main() {
  final errs = <String>[];

  try {
    final result = Color.black();
    
    if (result.red != 0) {
      errs.add('Se llamó a Color.black() y se obtuvo un Color con rojo igual a \n ${result.red} en lugar del valor esperado (0).');
    }

    if (result.green != 0) {
      errs.add('Se llamó a Color.black() y se obtuvo un Color con verde igual a \n ${result.green} en lugar del valor esperado (0).');
    }

    if (result.blue != 0) {
  errs.add('Se llamó a Color.black() y se obtuvo un Color con azul igual a \n ${result.blue} en lugar del valor esperado (0).');
    }
  } catch (e) {
    print('Se llamó a Color.black() y se obtuvo una excepción del tipo ${e.runtimeType}.');
    return;
  }

  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de constructores de redirección</summary>

  Tu constructor debería redirigir a `this(0, 0, 0)`.

  ```dart
    Color.black() : this(0, 0, 0);
  ```

</details>

## Constructores constantes

Si tu clase produce objetos que nunca cambian, puedes hacer que estos objetos sean constantes en tiempo de compilación. Para
hacer esto, define un constructor `const` y asegúrate de que todas las variables de instancia
sean finales.

<?code-excerpt "misc/lib/cheatsheet/redirecting_constructors.dart (const-constructors)"?>
```dart
class PuntoInmutable {
  static const PuntoInmutable origen = PuntoInmutable(0, 0);

  final int x;
  final int y;

  const PuntoInmutable(this.x, this.y);
}
```

#### Ejemplo de código

Modifica la clase `Recipe` para que sus instancias puedan ser constantes,
y crea un constructor constante que haga lo siguiente:

* Tiene tres parámetros: `ingredients`, `calories`,
  y `milligramsOfSodium` (en ese orden).
* Usa la sintaxis `this.` para asignar automáticamente los valores de los parámetros a las
  propiedades del objeto del mismo nombre.
* Es constante, con la palabra clave `const` justo antes
  de `Recipe` en la declaración del constructor.

Ignora todos los errores iniciales en DartPad.

```dart:run-dartpad:ga_id-const_constructors
class Recipe {
  List<String> ingredients;
  int calories;
  double milligramsOfSodium;

  // TODO: Crea un constructor constante aquí:

}


// Prueba tu solución (¡No edites!):
void main() {
  final errs = <String>[];

  try {
    const obj = Recipe(['1 egg', 'Pat of butter', 'Pinch salt'], 120, 200);
    
    if (obj.ingredients.length != 3) {
      errs.add('Se llamó a Recipe([\'1 egg\', \'Pat of butter\', \'Pinch salt\'], 120, 200) \n y se obtuvo un objeto con lista de ingredientes de longitud ${obj.ingredients.length} en lugar de la longitud esperada (3).');
    }
    
    if (obj.calories != 120) {
      errs.add('Se llamó a Recipe([\'1 egg\', \'Pat of butter\', \'Pinch salt\'], 120, 200) \n y se obtuvo un objeto con un valor de calorías de ${obj.calories} en lugar del valor esperado (120).');
    }
    
    if (obj.milligramsOfSodium != 200) {
      errs.add('Se llamó a Recipe([\'1 egg\', \'Pat of butter\', \'Pinch salt\'], 120, 200) \n y se obtuvo un objeto con un valor de milligramsOfSodium de ${obj.milligramsOfSodium} en lugar del valor esperado (200).');
    }
  } catch (e) {
    print('Se intentó llamar a Recipe([\'1 egg\', \'Pat of butter\', \'Pinch salt\'], 120, 200) \n y se recibió un nulo.');
  }

  if (errs.isEmpty) {
    print('¡Éxito!');
  } else {
    errs.forEach(print);
  }
}
```

<details>
  <summary>Solución para el ejemplo de constructores constantes</summary>

  Para hacer el constructor constante, deberás hacer que todas las propiedades sean finales.

  ```dart
  class Recipe {
    final List<String> ingredients;
    final int calories;
    final double milligramsOfSodium;

    const Recipe(this.ingredients, this.calories, this.milligramsOfSodium);
  }
  ```

</details>
