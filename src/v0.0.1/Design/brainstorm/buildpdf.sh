 # requires the installation of imageMagick tools for linux
 # e.g. 
 #  list available versions:  sudo apt list imagemagick -a
 #  Install latest version:   sudo apt install imagemagick 
 #  Install specific version: sudo apt install imagemagick:#.#.#.# 
 # References:  
 #  How to Install ImageMagick for PHP on Ubuntu 18.04 
 #  https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-install-imagemagick-for-php-on-ubuntu-18-04/
 set -x
 convert *.jpg "How To Play.pdf"