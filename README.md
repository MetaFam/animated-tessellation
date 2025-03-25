# Animated Octopus

This is a piece by [Cris Leash](https://crodrigues.portfoliobox.net) to tessellate an octopus in honor of [MetaGame](https://metagame.wtf).

[@dysbulic](https://github.com/dysbulic/) then aided [Cris](https://github.com/CrisLeash/) in setting up an animation such that the octopus grows and returns to a point.

The basic process follows this pattern:

![Basic Growth](growth.svg)

The program works bv `fetch`ing the SVG, then parsing it to pull out all the points for the triangles, which it then animates using successive triggers in SMIL `<animate/>` tags.