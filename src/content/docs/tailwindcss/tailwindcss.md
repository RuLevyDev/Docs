---
title: Tailwind CheatSheet
description: Tailwind CheatSheet
---
## Tailwind CheatSheet

### Layout

```html
<!-- Padding -->
<p class="p-4">Padding</p>

<!-- Margin -->
<p class="m-4">Margin</p>

<!-- Width -->
<div class="w-64">Width</div>

<!-- Height -->
<div class="h-64">Height</div>

<!-- Max Width -->
<div class="max-w-md">Max Width</div>

<!-- Max Height -->
<div class="max-h-64">Max Height</div>

<!-- Min Width -->
<div class="min-w-0">Min Width</div>

<!-- Min Height -->
<div class="min-h-0">Min Height</div>

<!-- Flex Container -->
<div class="flex">Flex Container</div>

<!-- Grid Container -->
<div class="grid grid-cols-2">Grid Container</div>
```

### Typography

```html
<!-- Text Color -->
<p class="text-red-500">Text Color</p>

<!-- Font Size -->
<p class="text-lg">Font Size</p>

<!-- Font Weight -->
<p class="font-bold">Font Weight</p>

<!-- Text Alignment -->
<p class="text-center">Text Alignment</p>

<!-- Text Decoration -->
<p class="underline">Text Decoration</p>

<!-- Line Height -->
<p class="leading-8">Line Height</p>

<!-- Letter Spacing -->
<p class="tracking-wide">Letter Spacing</p>
```

### Backgrounds

```html
<!-- Background Color -->
<div class="bg-blue-500">Background Color</div>

<!-- Background Image -->
<div class="bg-cover bg-center">Background Image</div>

<!-- Background Opacity -->
<div class="bg-black bg-opacity-50">Background Opacity</div>
```

### Borders

```html
<!-- Border -->
<div class="border border-gray-500">Border</div>
<!-- Rounded Corners -->
<div class="rounded-lg">Rounded Corners</div>
<!-- Border Color -->
<div class="border border-green-500">Border Color</div>
<!-- Border Width -->
<div class="border-2">Border Width</div>
<!-- Border Opacity -->
<div class="border-opacity-50">Border Opacity</div>
<!-- Border Collapse -->
<table class="border-separate">Border Separate</table>
<!-- Border Radius -->
<div class="rounded">Rounded</div>
<!-- Border Opacity -->
<div class="border-opacity-25">Border Opacity</div>

```

### Flexbox

```html
<!-- Flex Direction -->
<div class="flex flex-col">Flex Direction</div>

<!-- Flex Wrap -->
<div class="flex flex-wrap">Flex Wrap</div>

<!-- Justify Content -->
<div class="justify-center">Justify Content</div>

<!-- Align Items -->
<div class="items-center">Align Items</div>

<!-- Align Self -->
<div class="self-center">Align Self</div>
```

### Grid

```html
<!-- Grid Template Columns -->
<div class="grid grid-cols-3">Grid Template Columns</div>

<!-- Grid Gap -->
<div class="grid grid-cols-3 gap-4">Grid Gap</div>

<!-- Grid Row -->
<div class="grid grid-cols-3 gap-4 grid-rows-2">Grid Row</div>

<!-- Place Content -->
<div class="place-content-center">Place Content</div>

<!-- Place Items -->
<div class="place-items-center">Place Items</div>
```

### Spacing

```html
<!-- Padding -->
<div class="p-4">Padding</div>

<!-- Margin -->
<div class="m-4">Margin</div>
```

### Other Utilities

```html
<!-- Display -->
<div class="hidden">Hidden</div>

<!-- Visibility -->
<div class="invisible">Invisible</div>

<!-- Opacity -->
<div class="opacity-50">Opacity</div>

<!-- Z-index -->
<div class="z-10">Z-index</div>
```

Of course! Here are more examples of Tailwind CSS utility classes covering various aspects:

### Text

```html
<!-- Text Transform -->
<p class="uppercase">Uppercase</p>
<!-- Text Overflow -->
<p class="truncate">Truncate</p>
<!-- Text Shadow -->
<p class="text-shadow-lg">Text Shadow</p>
<!-- Text Ellipsis -->
<p class="truncate">Text Overflow Ellipsis</p>
<!-- Text Decoration -->
<p class="line-through">Line Through</p>
<!-- Text Overflow -->
<p class="overflow-ellipsis">Overflow Ellipsis</p>
<!-- Text Leading -->
<p class="leading-10">Leading 10</p>
<!-- Text Tracking -->
<p class="tracking-tighter">Tracking Tighter</p>

```

### Borders

```html
<!-- Border Radius -->
<div class="rounded-full">Rounded Full</div>

<!-- Border Style -->
<div class="border-solid">Border Solid</div>

<!-- Border Collapse -->
<table class="border-collapse">Border Collapse</table>
<!-- Border Radius -->
<div class="rounded">Rounded</div>

<!-- Border Opacity -->
<div class="border-opacity-25">Border Opacity</div>
```

### Backgrounds

```html
<!-- Background Size -->
<div class="bg-contain">Background Contain</div>
<!-- Background Position -->
<div class="bg-center">Background Center</div>
<!-- Background Repeat -->
<div class="bg-no-repeat">Background No Repeat</div>
<!-- Background Attachment -->
<div class="bg-fixed">Background Fixed</div>
<!-- Background Blend Mode -->
<div class="bg-blend-multiply">Background Blend Multiply</div>
<!-- Background Gradient -->
<div class="bg-gradient-to-r from-blue-500 to-green-500">Background Gradient</div>

```

### Flexbox

```html
<!-- Flex Grow -->
<div class="flex-grow">Flex Grow</div>
<!-- Flex Shrink -->
<div class="flex-shrink">Flex Shrink</div>
<!-- Flex Wrap -->
<div class="flex-no-wrap">Flex No Wrap</div>
<!-- Flex Direction -->
<div class="flex-row-reverse">Flex Row Reverse</div>
<!-- Flex Wrap -->
<div class="flex-wrap-reverse">Flex Wrap Reverse</div>
<!-- Flex Align -->
<div class="justify-between">Justify Between</div>

```

### Grid

```html
<!-- Grid Auto Flow -->
<div class="grid-flow-col">Grid Flow Col</div>
<!-- Grid Column Span -->
<div class="col-span-2">Column Span 2</div>
<!-- Grid Row Span -->
<div class="row-span-2">Row Span 2</div>
<!-- Grid Auto Rows -->
<div class="grid-rows-3">Grid Rows 3</div>
<!-- Grid Auto Columns -->
<div class="grid-cols-3">Grid Columns 3</div>
<!-- Grid Row Gap -->
<div class="gap-y-4">Grid Row Gap</div>
```

### Sizing

```html
<!-- Width Percentage -->
<div class="w-1/2">Width 1/2</div>

<!-- Height Percentage -->
<div class="h-1/4">Height 1/4</div>
```

### Responsive Design

```html
<!-- Responsive Padding -->
<div class="p-4 md:p-8 lg:p-12">Responsive Padding</div>

<!-- Responsive Visibility -->
<div class="visible md:invisible lg:visible">Responsive Visibility</div>

<!-- Responsive Text Size -->
<p class="text-lg md:text-xl lg:text-2xl">Responsive Text Size</p>
```

### Transforms
```html
<!-- Transform -->
<div class="transform rotate-45">Rotate 45</div>
<!-- Transform Origin -->
<div class="origin-center">Origin Center</div>
<!-- Scale -->
<div class="scale-150">Scale 150</div>
```
### Visibility
```html
<!-- Visible -->
<div class="visible">Visible</div>
<!-- Invisible -->
<div class="invisible">Invisible</div>
```
These additional examples should provide you with a broader understanding of Tailwind CSS utility classes and how they can be applied to different elements in your HTML. Remember that Tailwind CSS offers extensive documentation for further exploration and customization.