#!/bin/bash

export WORKDIR=$(pwd)
export DOCSDIR="$WORKDIR/docs"
rm -rf $DOCSDIR

# BH Documentation
cd bh/documentation/ && \
  yarn install && \
  yarn build --output-path "$DOCSDIR/bh/" && \
  cd $WORKDIR
