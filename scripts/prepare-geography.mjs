import {readFileSync,writeFileSync} from 'node:fs';
import {geoMercator,geoPath} from 'd3-geo';
const world=JSON.parse(readFileSync('public/maps/world.json','utf8'));
const project=(center,scale)=>geoMercator().center(center).scale(scale).translate([600,340]).clipExtent([[0,0],[1200,680]]);
const specs={region:project([34,31],1000),anatolia:project([34,38.5],2750),europe:project([21,46],650)};
const output={};
for(const [key,projection] of Object.entries(specs)){
 const path=geoPath(projection).digits(1);
 output[key]=world.features.map(f=>({name:f.properties.NAME,d:path(f)})).filter(f=>f.d);
}
writeFileSync('data/map-paths.json',JSON.stringify(output));
console.log('Local reference map paths prepared.');
