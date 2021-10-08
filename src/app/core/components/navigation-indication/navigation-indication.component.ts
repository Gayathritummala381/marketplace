import { Component, OnInit } from '@angular/core';
import { MenuColorMenuModel } from '../../models/menu-color.model';
import { MenuService } from '../../services/menu/menu.service';

@Component({
    selector: 'app-navigation-indication',
    templateUrl: './navigation-indication.component.html',
    styleUrls: ['./navigation-indication.component.css']
})
export class NavigationIndicationComponent implements OnInit {
    public selectedTenant: string;
    public fontClass: string;
    public backgroundClass: string;
    constructor(private menu: MenuService) { }

    public ngOnInit(): void {
        this.menu.getNavigationIndication().subscribe((tenantName: string) => {
            if (JSON.parse(sessionStorage.getItem("menu"))) {
                this.selectedTenant = JSON.parse(sessionStorage.getItem('menu')).tenantName;
            } else {
                this.selectedTenant = sessionStorage.getItem('tenantName');
            }

            this.menu.getAllColors().subscribe((selectedTenantName: MenuColorMenuModel[]) => {
                this.getColors(selectedTenantName);
            });
        });
    }

    private getColors(selectedTenantName): void {
        selectedTenantName.forEach((colorItem) => {
            if (colorItem.tenantName === this.selectedTenant) {
                this.backgroundClass = this.hexToRGB(colorItem.tenantColor, 0.1);
                this.fontClass = colorItem.tenantColor;
            } else {
                if (!JSON.stringify(selectedTenantName).includes(this.selectedTenant)) {
                    if (colorItem.tenantName === 'Other') {
                        this.backgroundClass = this.hexToRGB(colorItem.tenantColor, 0.1);
                        this.fontClass = colorItem.tenantColor;
                    }
                } else if (colorItem.tenantName === this.selectedTenant) {
                    this.backgroundClass = this.hexToRGB(colorItem.tenantColor, 0.1);
                    this.fontClass = colorItem.tenantColor;
                }
            }
        });
    }
    public hexToRGB(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
}