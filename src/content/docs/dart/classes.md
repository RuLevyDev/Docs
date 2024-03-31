---
title: Clases
description: Resumen de clases, instancias de clases y sus miembros.
---
Dart es un lenguaje orientado a objetos con clases y herencia basada en mixins. Cada objeto es una instancia de una clase, y todas las clases excepto `Null` descienden de [`Object`][].

La *herencia basada en mixins* significa que aunque cada clase (excepto la [clase superior][top-and-bottom], `Object?`) tiene exactamente una superclase, el cuerpo de una clase puede reutilizarse en múltiples jerarquías de clases. Los [métodos de extensión][] son una forma de agregar funcionalidad a una clase sin cambiar la clase ni crear una subclase. Los [modificadores de clase][] te permiten controlar cómo las bibliotecas pueden ser subtipos de una clase.

## Uso de los miembros de la clase

Los objetos tienen *miembros* que consisten en funciones y datos (*métodos* y *variables de instancia*, respectivamente). Cuando llamas a un método, lo *invocas* en un objeto: el método tiene acceso a las funciones y datos de ese objeto.

Usa un punto (`.`) para referirte a una variable de instancia o método:

```dart
var p = Point(2, 2);

// Obtiene el valor de y.
assert(p.y == 2);

// Invoca distanceTo() en p.
double distancia = p.distanceTo(Point(4, 4));
```

Usa `?.` en lugar de `.` para evitar una excepción cuando el operando más a la izquierda es nulo:

```dart
// Si p no es nulo, asigna una variable igual a su valor y.
var a = p?.y;
```

## Uso de constructores

Puedes crear un objeto usando un *constructor*. Los nombres de los constructores pueden ser <code><em>NombreDeLaClase</em></code> o <code><em>NombreDeLaClase</em>.<em>identificador</em></code>. Por ejemplo, el siguiente código crea objetos `Point` usando los constructores `Point()` y `Point.fromJson()`:

```dart
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
```

El siguiente código tiene el mismo efecto, pero usa la palabra clave opcional `new` antes del nombre del constructor:

```dart
var p1 = new Point(2, 2);
var p2 = new Point.fromJson({'x': 1, 'y': 2});
```

Algunas clases proporcionan [constructores constantes][]. Para crear una constante en tiempo de compilación usando un constructor constante, coloca la palabra clave `const` antes del nombre del constructor:

<?code-excerpt "misc/test/language_tour/classes_test.dart (const)"?>
```dart
var p = const ImmutablePoint(2, 2);
```

La construcción de dos constantes idénticas en tiempo de compilación resulta en una sola instancia canónica:

```dart
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);

assert(identical(a, b)); // ¡Son la misma instancia!
```

Dentro de un _contexto constante_, puedes omitir el `const` antes de un constructor o literal. Por ejemplo, mira este código, que crea un mapa constante:

```dart
// Muchas palabras clave const aquí.
const pointAndLine = const {
  'point': const [const ImmutablePoint(0, 0)],
  'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
};
```

Puedes omitir todas las palabras clave `const` excepto la primera:

```dart
// Solo una constante, que establece el contexto constante.
const pointAndLine = {
  'point': [ImmutablePoint(0, 0)],
  'line': [ImmutablePoint(1, 10), ImmutablePoint(-2, 11)],
};
```

Si un constructor constante está fuera de un contexto constante y se invoca sin `const`, crea un **objeto no constante**:

```dart
var a = const ImmutablePoint(1, 1); // Crea una constante
var b = ImmutablePoint(1, 1); // NO crea una constante

assert(!identical(a, b)); // ¡NO son la misma instancia!
```

## Obteniendo el tipo de un objeto

Para obtener el tipo de un objeto en tiempo de ejecución, puedes usar la propiedad `runtimeType` de `Object`, que devuelve un objeto [`Type`][].

```dart
print('El tipo de a es ${a.runtimeType}');
```

:::advertencia
Usa un [operador de prueba de tipo][] en lugar de `runtimeType` para probar el tipo de un objeto. En entornos de producción, la prueba `object is Type` es más estable que la prueba `object.runtimeType == Type`.
:::

Hasta aquí, has visto cómo _usar_ clases. El resto de esta sección muestra cómo _implementar_ clases.

## Variables de instancia

Así es como declaras variables de instancia:

```dart
class Point {
  double? x; // Declara la variable de instancia x, inicialmente nula.
  double? y; // Declara y, inicialmente nula.
  double z = 0; // Declara z, inicialmente 0.
}
```

Una variable de instancia no inicializada declarada con un [tipo nullable][] tiene el valor `null`. Las variables de instancia no nulas [deben inicializarse][] en la declaración.

Todas las variables de instancia generan un método *getter* implícito. Las variables de instancia no finales y las variables de instancia `late final` sin inicializadores también generan un método *setter* implícito. Para más detalles, consulta [Getters y setters][].

```dart
class Point {
  double? x; // Declara la variable de instancia x, inicialmente nula.
  double? y; // Declara y, inicialmente nula.
}

void main() {
  var punto = Point();
  punto.x = 4; // Usa el método setter para x.
  assert(punto.x == 4); // Usa el método getter para x.
  assert(punto.y == null); // Los valores por defecto son null.
}
```

Inicializar una variable de instancia no `late` donde se declara establece el valor cuando se crea la instancia, antes de que se ejecute el constructor y su lista de inicializadores. Como resultado, la expresión de inicialización (después del `=`) de una variable de instancia no `late` no puede acceder a `this`.

```dart
double xInicial = 1.5;

class Point {
  // OK, puede acceder a las declaraciones que no dependen de `this`:
  double? x = xInicial;

  // ERROR, no puede acceder a `this

` en un inicializador no `late`:
  double? y = this.x;

  // OK, puede acceder a `this` en un inicializador `late`:
  late double? z = this.x;

  // OK, `this.fieldName` es una declaración de parámetro, no una expresión:
  Point(this.x, this.y);
}
```

Las variables de instancia pueden ser `final`, en cuyo caso deben establecerse exactamente una vez. Inicializa las variables de instancia `final`, no `late`, en la declaración, usando un parámetro del constructor o usando la lista de inicializadores de un constructor:

```dart
class MarcadorPerfil {
  final String nombre;
  final DateTime inicio = DateTime.now();

  MarcadorPerfil(this.nombre);
  MarcadorPerfil.sinNombre() : nombre = '';
}
```

Si necesitas asignar el valor de una variable de instancia `final` después de que el cuerpo del constructor comience, puedes usar uno de los siguientes métodos:

* Usa un [constructor de fábrica][].
* Usa `late final`, pero [_ten cuidado:_][late-final-ivar] un `late final` sin un inicializador agrega un método setter a la API.

## Interfaces implícitas

Cada clase define implícitamente una interfaz que contiene todos los miembros de instancia de la clase y de cualquier interfaz que implemente. Si quieres crear una clase A que admita la API de la clase B sin heredar la implementación de B, la clase A debe implementar la interfaz B.

Una clase implementa una o más interfaces declarándolas en una cláusula `implements` y luego proporcionando las API requeridas por las interfaces. Por ejemplo:

```dart
// Una persona. La interfaz implícita contiene greet().
class Persona {
  // En la interfaz, pero visible solo en esta biblioteca.
  final String _nombre;

  // No en la interfaz, ya que este es un constructor.
  Persona(this._nombre);

  // En la interfaz.
  String saludar(String quien) => '¡Hola, $quien. Soy $_nombre!';
}

// Una implementación de la interfaz Persona.
class Impostor implements Persona {
  String get _nombre => '';

  String saludar(String quien) => 'Hola $quien. ¿Sabes quién soy?';
}

String saludarBob(Persona persona) => persona.saludar('Bob');

void main() {
  print(saludarBob(Persona('Kathy')));
  print(saludarBob(Impostor()));
}
```

Aquí hay un ejemplo de especificar que una clase implementa múltiples interfaces:

```dart
class Punto implements Comparable, Ubicacion {...}
```

## Variables y métodos de clase

Usa la palabra clave `static` para implementar variables y métodos de clase.

### Variables estáticas

Las variables estáticas (variables de clase) son útiles para el estado y las constantes de la clase:

```dart
class Cola {
  static const capacidadInicial = 16;
  // ···
}

void main() {
  assert(Cola.capacidadInicial == 16);
}
```

Las variables estáticas no se inicializan hasta que se utilizan.

:::nota
Esta página sigue la
[recomendación de la guía de estilo](/effective-dart/style#identifiers)
de preferir `lowerCamelCase` para los nombres constantes.
:::

### Métodos estáticos

Los métodos estáticos (métodos de clase) no operan en una instancia y, por lo tanto, no tienen acceso a `this`. Sin embargo, tienen acceso a variables estáticas. Como muestra el siguiente ejemplo, puedes invocar métodos estáticos directamente en una clase:

```dart
import 'dart:math';

class Punto {
  double x, y;
  Punto(this.x, this.y);

  static double distanciaEntre(Punto a, Punto b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}

void main() {
  var a = Punto(2, 2);
  var b = Punto(4, 4);
  var distancia = Punto.distanciaEntre(a, b);
  assert(2.8 < distancia && distancia < 2.9);
  print(distancia);
}
```

:::nota
Considera usar funciones de nivel superior, en lugar de métodos estáticos, para utilidades y funcionalidades comunes o ampliamente utilizadas.
:::

Puedes usar métodos estáticos como constantes en tiempo de compilación. Por ejemplo, puedes pasar un método estático como parámetro a un constructor constante.

[`Object`]: {{site.dart-api}}/{{site.sdkInfo.channel}}/dart-core/Object-class.html
[top-and-bottom]: /null-safety/understanding-null-safety#top-and-bottom
[métodos de extensión]: /language/extension-methods
[modificadores de clase]: /language/class-modifiers
[constructores constantes]: /language/constructors#constant-constructors
[`Type`]: {{site.dart-api}}/{{site.sdkInfo.channel}}/dart-core/Type-class.html
[operador de prueba de tipo]: /language/operators#type-test-operators
[Getters y setters]: /language/methods#getters-and-setters
[inicializador de lista]: /language/constructors#initializer-list
[constructor de fábrica]: /language/constructors#factory-constructors
[tipo nullable]: /null-safety/understanding-null-safety#using-nullable-types
[deben inicializarse]: /null-safety/understanding-null-safety#uninitialized-variables