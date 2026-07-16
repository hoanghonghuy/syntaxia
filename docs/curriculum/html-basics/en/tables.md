---
id: html-08-tables
track: html-basics
locale: en
slug: tables
title: Tables for data
order: 8
published: true
objectives:
  - Build a data table with table, tr, th, and td
  - Separate header and body with thead and tbody
  - Use tables for data, not for page layout
exercise:
  mode: html
  starter: |
    <!-- Build a small table with header and data cells -->
    
  hints:
    - Wrap rows in table and tr.
    - Use th for a header cell.
    - Use td for a data cell.
  solution: |
    <table>
      <tr>
        <th>Name</th>
        <td>Alex</td>
      </tr>
    </table>
  expected:
    type: htmlTags
    tags:
      - tag: table
        minCount: 1
      - tag: tr
        minCount: 1
      - tag: th
        minCount: 1
      - tag: td
        minCount: 1
---

A **table** shows information in rows and columns — schedules, comparisons, score sheets. HTML tables are for *tabular data*, not for drawing the whole page layout. Layout belongs to CSS; tables keep cells aligned with meaning.

A spreadsheet is the right mental model: column headers across the top, one record per row.

| Element | Role |
| --- | --- |
| `table` | The whole grid |
| `thead` / `tbody` | Header group and body group |
| `tr` | One row |
| `th` | Header cell (column or row label) |
| `td` | Ordinary data cell |

## Worked example

```html
<table>
  <thead>
    <tr>
      <th>Crop</th>
      <th>Days to harvest</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Radish</td>
      <td>25</td>
    </tr>
    <tr>
      <td>Carrot</td>
      <td>70</td>
    </tr>
  </tbody>
</table>
```

- `thead` holds the header row; each label is a `th`.
- Each data row is a `tr` inside `tbody`; each value is a `td`.
- Column order stays consistent: crop name, then days.

Screen readers can announce header cells with the data they describe when the markup is structured this way.

## Common mistakes

- Building the whole page with nested tables for layout — use landmarks and CSS instead.
- Using only `td` for headers — prefer `th` so tools know which cells label columns.
- Misaligned columns (three cells in one row, two in the next) — every row should follow the same column plan.

## Your turn

Use the sandbox below to build a small data table. When the checker shows **Correct**, mark this lesson complete.
