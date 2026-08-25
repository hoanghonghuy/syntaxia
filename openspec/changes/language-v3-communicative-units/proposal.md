# Proposal — Language V3 communicative units

## Problem

The current language hub treats each lesson as an independent path node. That is sufficient for navigation, but it does not express the product's intended learning model: a learner should move through a communicative goal made of guided lessons, an end-of-unit checkpoint, and later review.

Inferring units from localized titles or slugs would make the curriculum contract fragile and would couple product behavior to copywriting.

## Goal

Introduce an explicit, content-owned communicative unit contract that can drive the language path without changing the relational lesson schema.

A unit must be able to express:

- a stable unit identifier;
- localized unit title and Can-Do outcome;
- stable unit order;
- node role: lesson, checkpoint, or review;
- sequential progress/locking behavior;
- safe rendering of legacy lessons that have not yet been migrated.

## Non-goals

- Mass-migrating every language lesson in this change.
- Guessing unit membership from title, slug, vocabulary, or lesson position.
- Adding a new database table before the content model proves that it needs one.
- Replacing the existing FSRS review system.

## Product outcome

Language tracks can render real communicative groups while preserving backward compatibility. L5 can then build one production-quality golden unit per language against a stable contract before L6 scales the migration.
