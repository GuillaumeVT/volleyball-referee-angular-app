import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { UserSummary } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { AbstractRulesFilter } from '@shared/models/abstract-rules-filter.model';
import { Rules, RulesSummary } from '@shared/models/rules.model';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { UserRulesDialogComponent, UserRulesDialogData } from '@user-data/components/user-rules-dialog/user-rules-dialog.component';
import { CrudType } from '@user-data/models/crud-type.model';
import { RulesService } from '@user-data/services/rules.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-rules',
  templateUrl: './user-rules.component.html',
  styleUrls: ['./user-rules.component.scss'],
})
export class UserRulesComponent extends AbstractRulesFilter implements OnInit, OnDestroy {
  user: UserSummary;

  private subscription: Subscription = new Subscription();

  constructor(
    private _titleService: Title,
    private _userService: UserService,
    private _rulesService: RulesService,
    private _dialog: MatDialog,
    private _snackBarService: SnackBarService,
    private _translateService: TranslateService,
  ) {
    super();
    this._translateService.get('user.rules.page').subscribe((t) => this._titleService.setTitle(t));
  }

  ngOnInit() {
    this.subscription.add(
      this._userService.authState.subscribe((userToken) => {
        this.user = userToken.user;
        if (this.user) {
          this.refreshRules();
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshRules(): void {
    this._rulesService.listRules(this.getKinds()).subscribe({
      next: (rules) => this.onRulesReceived(rules),
      error: (_) => this.onRulesReceived([]),
    });
  }

  createRules(kind: string): void {
    const rules = Rules.createRules(this.user, kind);

    const data: UserRulesDialogData = {
      crudType: CrudType.Create,
      rules: rules,
    };

    const dialogRef = this._dialog.open(UserRulesDialogComponent, { width: '800px', data: data });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onRulesCreated();
      }
    });
  }

  viewRules(rulesSummary: RulesSummary): void {
    this._rulesService.getRules(rulesSummary.id).subscribe((rules) => {
      const data: UserRulesDialogData = {
        crudType: CrudType.View,
        rules: rules,
      };

      const dialogRef = this._dialog.open(UserRulesDialogComponent, { width: '800px', data: data });
    });
  }

  updateRules(rulesSummary: RulesSummary): void {
    this._rulesService.getRules(rulesSummary.id).subscribe((rules) => {
      const data: UserRulesDialogData = {
        crudType: CrudType.Update,
        rules: rules,
      };

      const dialogRef = this._dialog.open(UserRulesDialogComponent, { width: '800px', data: data });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.onRulesUpdated();
        }
      });
    });
  }

  deleteRules(rulesSummary: RulesSummary): void {
    this._translateService.get(['user.team.delete', 'user.rules.messages.delete-question'], { name: rulesSummary.name }).subscribe((ts) => {
      const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: { title: ts['user.rules.delete'], message: ts['user.rules.messages.delete-question'] },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this._rulesService.deleteRules(rulesSummary.id).subscribe({
            next: (_deleted) => this.onRulesDeleted(),
            error: (_) => this.onRulesDeletionError(),
          });
        }
      });
    });
  }

  deleteAllRules(): void {
    this._translateService.get(['user.rules.delete', 'user.rules.messages.delete-all-question']).subscribe((ts) => {
      const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: { title: ts['user.rules.delete'], message: ts['user.rules.messages.delete-all-question'] },
      });
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this._rulesService.deleteAllRules().subscribe((_deleted) => this.onAllRulesDeleted());
        }
      });
    });
  }

  onRulesCreated(): void {
    this.refreshRules();
  }

  onRulesUpdated(): void {
    this.refreshRules();
  }

  onRulesDeleted(): void {
    this.refreshRules();
  }

  onRulesDeletionError(): void {
    this._translateService.get('user.rules.messages.deleted-error').subscribe((t) => this._snackBarService.showError(t));
  }

  onAllRulesDeleted(): void {
    this.refreshRules();
  }
}
