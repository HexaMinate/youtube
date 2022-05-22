for i in */; do zip -r "./compressed/${i%/}.zip" "$i"; done

