Problem description
3 character transform functions

hFlip flips all rows horizontally (i.e. 1 swaps with 0, 2 with 9, etc)
vFlip flips all cols vertically (i.e. 1 swaps with z, 9 swaps with /, etc)
shift shifts the keys N places to the right (N > 0) or left (N < 0)

input transformation is of the form H,V,H,5,V,-12,V,2

input comes from two text files, one indicating the transforms, one containing the text

Output is the transformed text

Make sure to be able to transform megabytes of text  
input is lowercase
unrecognized characters (including any uppercase) are output unchanged




SOLUTION PLAN:
Define a virtual keyboard as a two dimensional array
Compute a second, transformed keyboard
Generate a mapping represented as a single dimension array whose indices represent
input ascii keycodes (eg: arr[49] contains the mapping for '1')  Possibly subtract 44
from each index so that it starts at index zero.  The comma key is the lowest key code.
There will be a big gap in the array where the capital letters are,
along with some other unused key codes before the lowercase letters begin.  This is acceptable.

The program will pipe the input text through a transform stream and then through an
output pipe to stdout.

execute the program as: node transform.js input-file input-text

