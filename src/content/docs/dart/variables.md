---
title: Variables
description: Variables en Dart.
---

Aquí tienes un ejemplo de cómo crear una variable e inicializarla:

```dart
var nombre = 'Bob';
```

Las variables almacenan referencias. La variable llamada `nombre` contiene una referencia a un objeto `String` con un valor de "Bob".

El tipo de la variable `nombre` se infiere como `String`, pero puedes cambiar ese tipo especificándolo. Si un objeto no está restringido a un solo tipo, especifica el tipo `Object` (o `dynamic` si es necesario).

```dart
Object nombre = 'Bob';
```

Otra opción es declarar explícitamente el tipo que se inferiría:

```dart
String nombre = 'Bob';
```

:::note
Esta página sigue la recomendación de la
[guía de estilo](/effective-dart/design#types)
de utilizar `var`, en lugar de anotaciones de tipo, para variables locales.
:::

## Seguridad de nulos

El lenguaje Dart hace cumplir la seguridad de nulos sólida.

La seguridad de nulos previene un error que resulta de un acceso no intencional a variables establecidas en `null`. El error se llama error de desreferencia nula. Un error de desreferencia nula ocurre cuando accedes a una propiedad o llamas a un método en una expresión que se evalúa como `null`. Una excepción a esta regla es cuando `null` admite la propiedad o método, como `toString()` o `hashCode`. Con la seguridad de nulos, el compilador de Dart detecta estos posibles errores en tiempo de compilación.

Por ejemplo, digamos que quieres encontrar el valor absoluto de una variable `int` llamada `i`. Si `i` es `null`, llamar a `i.abs()` causa un error de desreferencia nula. En otros lenguajes, intentar esto podría llevar a un error en tiempo de ejecución, pero el compilador de Dart prohíbe estas acciones. Por lo tanto, las aplicaciones de Dart no pueden causar errores en tiempo de ejecución.

La seguridad de nulos introduce tres cambios clave:

1. Cuando especificas un tipo para una variable, parámetro o otro componente relevante, puedes controlar si el tipo permite `null`. Para habilitar la posibilidad de nulos, agregas un `?` al final de la declaración del tipo.

   ```dart
   String? nombre // Tipo nullable. Puede ser `null` o cadena.

   String nombre  // Tipo no nullable. No puede ser `null` pero puede ser una cadena.
   ```

2. Debes inicializar las variables antes de usarlas. Las variables nulas por defecto son `null`, por lo que se inicializan de forma predeterminada. Dart no establece valores iniciales para tipos no nulos. Te obliga a establecer un valor inicial. Dart no te permite observar una variable no inicializada. Esto evita que accedas a propiedades o llames a métodos donde el tipo del receptor puede ser `null` pero `null` no admite el método o propiedad utilizado.

3. No puedes acceder a propiedades o llamar a métodos en una expresión con un tipo nulo. Se aplica la misma excepción donde es una propiedad o método que `null` admite como `hashCode` o `toString()`.

La seguridad de nulos convierte los posibles **errores en tiempo de ejecución** en **errores de análisis en tiempo de edición**. La seguridad de nulos marca una variable no nula cuando:

* No se ha inicializado con un valor no nulo.
* Se ha asignado un valor `null`.

Esta comprobación te permite corregir estos errores _antes_ de implementar tu aplicación.

## Valor predeterminado

Las variables no inicializadas que tienen un tipo nullable tienen un valor inicial de `null`. Incluso las variables con tipos numéricos son inicialmente nulas, porque los números, al igual que todo en Dart, son objetos.

```dart
int? cantidadLineas;
assert(cantidadLineas == null);
```

:::note
El código de producción ignora la llamada a `assert()`. Durante el desarrollo, por otro lado, <code>assert(<em>condición</em>)</code> genera una excepción si _condición_ es falsa. Para más detalles, consulta [Assert][].
:::

Con la seguridad de nulos, debes inicializar los valores de las variables no nulas antes de usarlas:

```dart
int cantidadLineas = 0;
```

No es necesario inicializar una variable local donde se declara, pero sí debes asignarle un valor antes de usarla. Por ejemplo, el siguiente código es válido porque Dart puede detectar que `cantidadLineas` no es nula cuando se pasa a `print()`:

```dart
int cantidadLineas;

if (nosGustaContar) {
  cantidadLineas = contarLineas();
} else {
  cantidadLineas = 0;
}

print(cantidadLineas);
```

Las variables de nivel superior y de clase se inicializan de forma perezosa; el código de inicialización se ejecuta la primera vez que se usa la variable.

## Variables tardías

El modificador `late` tiene dos casos de uso:

* Declarar una variable no nula que se inicializa después de su declaración.
* Inicializar perezosamente una variable.

A menudo, el análisis de flujo de control de Dart puede detectar cuando una variable no nula se establece en un valor no nulo antes de que se use, pero a veces el análisis falla. Dos casos comunes son las variables de nivel superior y las variables de instancia: Dart a menudo no puede determinar si se establecen, así que no lo intenta.

Si estás seguro de que una variable se establece antes de que se use, pero Dart no está de acuerdo, puedes corregir el error marcando la variable como `late`:

```dart
[!late!] String descripcion;

void main() {
  descripcion = '¡Feijoada!';
  print(descripcion);
}
```

:::warning Aviso
Si no inicializas una variable `late`, se produce un error en tiempo de ejecución cuando se utiliza la variable.
:::

Cuando marcas una variable como `late` pero la inicializas en su declaración, entonces el inicializador se ejecuta la primera vez que se usa la variable. Esta inicialización perezosa es útil en un par de casos:

* Es posible que no se necesite la variable, y inicializarla es costoso.
* Estás inicializando una variable de instancia, y su inicializador necesita acceder a `this`.

En el siguiente ejemplo, si la variable `temperatura` nunca se usa, entonces la función costosa `leerTermómetro()` nunca se llama:

```dart
// Esta es la única llamada del programa a leerTermómetro().
[!late!] String temperatura = leerTermómetro(); // Inicialización perezosa.
```

## Final y const

Si nunca tienes la intención de cambiar

 una variable, usa `final` o `const`, ya sea en lugar de `var` o además de un tipo. Una variable final solo se puede establecer una vez; una variable constante es una constante en tiempo de compilación. (Las variables constante son implícitamente finales).

:::note
[Variables de instancia][] pueden ser `final` pero no `const`.
:::

Aquí tienes un ejemplo de cómo crear y establecer una variable `final`:

```dart
final nombre = 'Bob'; // Sin una anotación de tipo
final String apodo = 'Bobby';
```

No puedes cambiar el valor de una variable `final`:

```dart tag=fails-sa
nombre = 'Alice'; // Error: una variable final solo puede establecerse una vez.
```

Usa `const` para variables que quieras que sean **constantes en tiempo de compilación**. Si la variable constante está a nivel de clase, márcala como `static const`. Donde declares la variable, establece el valor como una constante en tiempo de compilación, como un número o una cadena literal, una variable constante o el resultado de una operación aritmética en números constantes:

```dart
const bar = 1000000; // Unidad de presión (dinas/cm2)
const double atm = 1.01325 * bar; // Atmosfera estándar
```

La palabra clave `const` no solo es para declarar variables constantes. También puedes usarla para crear _valores_ constantes, así como para declarar constructores que _crean_ valores constantes. Cualquier variable puede tener un valor constante.

```dart
var foo = const [];
final bar = const [];
const baz = []; // Equivalente a `const []`
```

Puedes omitir `const` de la expresión de inicialización de una declaración `const`, como en `baz` arriba. Para más detalles, consulta [NO uses const redundante][].

Puedes cambiar el valor de una variable no final, no constante, incluso si solía tener un valor `const`:

```dart
foo = [1, 2, 3]; // Era const []
```

No puedes cambiar el valor de una variable `const`:

```dart
baz = [42]; // Error: las variables constantes no pueden recibir un valor.
```

Puedes definir constantes que utilicen
[verificaciones y conversiones de tipos][] (`is` y `as`),
[colecciones `if`][],
y [operadores de expansión][] (`...` y `...?`):

```dart
const Object i = 3; // Donde i es un Object constante con un valor int...
const lista = [i as int]; // Usa una conversión de tipo.
const mapa = {if (i is int) i: 'int'}; // Usa is y colección if.
const conjunto = {if (lista is List<int>) ...lista}; // ...y una expansión.
```

:::note
Aunque un objeto `final` no se puede modificar, sus campos pueden cambiarse. En comparación, un objeto `const` y sus campos no se pueden cambiar: son _inmutables_.
:::

Para obtener más información sobre cómo usar `const` para crear valores constantes, consulta
[Listas][], [Mapas][], y [Clases][].


[Assert]: /language/error-handling#assert
[Variables de instancia]: /language/classes#instance-variables
[NO uses const redundante]: /effective-dart/usage#dont-use-const-redundantly
[verificaciones y conversiones de tipos]: /language/operators#type-test-operators
[colecciones `if`]: /language/collections#control-flow-operators
[operadores de expansión]: /language/collections#spread-operators
[Listas]: /language/collections#lists
[Mapas]: /language/collections#maps
[Clases]: /language/classes