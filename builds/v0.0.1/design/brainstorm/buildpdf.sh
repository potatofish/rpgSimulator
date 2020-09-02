 # requires the installation of imageMagick tools for linux
 # e.g. 
 #  list available versions:  sudo apt list imagemagick -a
 #  Install latest version:   sudo apt install imagemagick 
 #  Install specific version: sudo apt install imagemagick:#.#.#.# 
 # References:  
 #  How to Install ImageMagick for PHP on Ubuntu 18.04 
 #  https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-install-imagemagick-for-php-on-ubuntu-18-04/
set +x
#find . -maxdepth 1 -type f -name "*.jpg" > imageJPG_list.tmp

#fileList="./imageJPG_list.tmp"
tmpDirectory="./convert/"
finalPDF="./How To Play.pdf"

rm -f "$finalPDF"
touch "$finalPDF"

mkdir  "$tmpDirectory"

convert -define "registry:temporary-path=$tmpDirectory" -limit memory 2gb slides/*.jpg[1600x900] "$finalPDF"

rm -r "$tmpDirectory"

