PROGRAM EXECUTION
=================

execute the program with: `node transform.js mapping-directives-file input-text-file`

run `node transform.js` to show available flags

PROBLEM DESCRIPTION
===================

Three different character transform functions must be available:

 * hFlip flips all rows horizontally (i.e. 1 swaps with 0, 2 with 9, etc)
 * vFlip flips all cols vertically (i.e. 1 swaps with z, 9 swaps with /, etc)
 * shift shifts the keys N places to the right (N > 0) or left (N < 0)

Input transformation is of the form H,V,H,5,V,-12,V,2

Input comes from two text files, one indicating the transforms, one containing the text.

Output is the transformed text.

Make sure to be able to efficiently transform megabytes of text.
Valid input is lowercase.
Unrecognized characters (including any uppercase) are output unchanged.

SOLUTION PLAN
=============

 * Define a virtual keyboard as a two dimensional array.
 * Compute a second, transformed keyboard.
 * Generate a mapping represented as a single dimension array whose indices represent
  input ascii keycodes (eg: arr[49] contains the mapping for '1')
 * Possibly subtract 44 from each index so that it starts at index zero.
  (The comma key has the lowest key code value of 44)

There will be a gap in the array where the capital letters are,
(along with some other unused key codes) after the digits 0 to 9 and before the
lowercase letters begin.  This is acceptable.  

The program will pipe the input text through a transform stream and then through an
output pipe to stdout.
