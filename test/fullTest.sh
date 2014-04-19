#!/bin/bash
green='\e[0;32m'
red='\e[1;31m'
endcolor='\e[0m'
i=0;
for file in directives*;
do
  i=$[$i+1]
  noderesult=$(node ../transform.js $file data$i.txt)
  expectedresult=$(cat result$i.txt)
  if [[ $noderesult != $expectedresult ]]
  then
    echo -e "${red}fail$i$endcolor - expected $expectedresult but calculated $noderesult"
  else
    echo -e "${green}pass$i$endcolor - on transform directive $(cat $file)"
  fi
done
