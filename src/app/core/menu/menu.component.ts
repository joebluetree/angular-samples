import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, tap } from 'rxjs';

import { Router } from '@angular/router';
import { auth_logout } from '../store/auth.actions';
import { selectIsLogin, selectIsLogout, selectMenuList, selectModuleList, selectUserName } from '../store/auth.selectors';
import { CoreState } from '../store/index';
import { iMenum } from 'src/app/user-admin/models/imenum';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = "Cargomar Pvt Ltd";

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  userName$: Observable<string | undefined>;

  moduleList$: Observable<any>;

  records$: Observable<iMenum[]>;

  constructor(
    private store: Store<CoreState>,
    private gs: GlobalService,
    private router: Router
  ) {

    this.isLoggedIn$ = this.store.select(selectIsLogin);
    this.isLoggedOut$ = this.store.select(selectIsLogout);
    this.userName$ = this.store.select(selectUserName);
    this.moduleList$ = this.store.select(selectModuleList).pipe(
      tap(e => console.log(e))
    );
    this.records$ = this.store.select(selectMenuList).pipe(
      tap(e => console.log(e))
    );
  }

  isOk(module: any, menu: any) {
    return module.name == menu.menu_module_name
  }

  getParam(menu: iMenum) {
    const param = JSON.parse(menu.menu_param.replaceAll("'", '"'));
    param.appid = this.gs.app_id;
    return param;
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  logout() {
    this.store.dispatch(auth_logout());
    this.router.navigate(['home']);
  }

}
