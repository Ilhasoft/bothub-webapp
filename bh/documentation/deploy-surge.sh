#!/bin/bash

export SURGE_DIST_DIR=./surge-dist/

yarn build --output-path $SURGE_DIST_DIR
surge $SURGE_DIST_DIR bothub-bh.surge.sh
rm -r $SURGE_DIST_DIR
