import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  ir.addSvgIcon('icon_fabu', ds.bypassSecurityTrustResourceUrl('assets/icon_fabu.svg'));
}
