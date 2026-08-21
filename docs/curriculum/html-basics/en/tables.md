---
id: html-08-tables
track: html-basics
locale: en
slug: tables
title: Accessible data tables
order: 8
published: true
can_do: "Represent two-dimensional data with captioned table structure, explicit header cells, and body rows instead of using tables for page layout"
objectives:
  - Separate table caption, header rows, and body rows
  - Use th with column scope for header cells
  - Keep tables for genuinely tabular relationships
exercise:
  mode: html
  starter: |
    <!-- TODO: build a table with caption, thead, tbody, two column headers, and one data row -->
  hints:
    - Start with table and add a caption describing the dataset.
    - Put two th elements with scope="col" inside a thead row.
    - Add tbody with one tr containing two td data cells.
  solution: |
    <table>
      <caption>Workshop seats</caption>
      <thead>
        <tr><th scope="col">Name</th><th scope="col">Seats</th></tr>
      </thead>
      <tbody>
        <tr><td>Alex</td><td>2</td></tr>
      </tbody>
    </table>
  expected:
    type: htmlTags
    tags:
      - tag: table
        minCount: 1
      - tag: caption
        minCount: 1
      - tag: thead
        minCount: 1
      - tag: tbody
        minCount: 1
      - tag: tr
        minCount: 2
      - tag: th
        minCount: 2
        attrEquals:
          scope: col
      - tag: td
        minCount: 2
---

A data table encodes a two-dimensional relationship. The goal is not to draw boxes; it is to make each data cell understandable in relation to its row/column headers.

## Mental model

```text
table
├─ caption -> what dataset is this?
├─ thead
│  └─ tr -> th(scope=col), th(scope=col)
└─ tbody
   └─ tr -> td, td
```

A spreadsheet-like grid is a good table candidate. Page navigation and overall layout are not.

## Predict the rendered structure

Before previewing, trace the cell `2` in a row under the `Seats` header. The semantic question is “which header describes this cell?”, not only “which column looks aligned?”.

## Worked example

```html
<table>
  <caption>Workshop seats</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Seats</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Alex</td><td>2</td></tr>
  </tbody>
</table>
```

`caption` names the dataset; `thead`/`tbody` expose groups; `th scope="col"` explicitly marks the two column headers.

## Debug this

```html
<table>
  <tr><td>Name</td><td>Seats</td></tr>
  <tr><td>Alex</td><td>2</td></tr>
</table>
```

It may look like a grid, but the first row is only ordinary data cells. Use real header cells and structure so tools can understand the relationships.

## Common mistakes

- Using tables to lay out an entire page.
- Styling the first row bold but leaving it as `td` instead of `th`.
- Omitting a useful caption when the dataset needs context.

## Your turn

Build the small accessible table described in the starter. The grader checks the table groups and scoped column headers, not only whether a `table` tag exists.

## Quick check

What does `scope="col"` communicate on a `th`?

**Answer:** that the header cell describes the cells in its column.
