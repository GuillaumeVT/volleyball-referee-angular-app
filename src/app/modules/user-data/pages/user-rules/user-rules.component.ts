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
    private titleService: Title,
    private userService: UserService,
    private rulesService: RulesService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private translate: TranslateService,
  ) {
    super();
    this.translate.get('user.rules.page').subscribe((t) => this.titleService.setTitle(t));
  }

  ngOnInit() {
    this.subscription.add(
      this.userService.authState.subscribe((userToken) => {
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
    this.rulesService.listRules(this.getKinds()).subscribe({
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

    const dialogRef = this.dialog.open(UserRulesDialogComponent, { width: '800px', data: data });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onRulesCreated();
      }
    });
  }

  viewRules(rulesSummary: RulesSummary): void {
    this.rulesService.getRules(rulesSummary.id).subscribe({
      next: (rules) => {
        const data: UserRulesDialogData = {
          crudType: CrudType.View,
          rules: rules,
        };

        const dialogRef = this.dialog.open(UserRulesDialogComponent, { width: '800px', data: data });
      },
      error: (_) => this.snackBarService.showError('Rules could not be found.'),
    });
  }

  updateRules(rulesSummary: RulesSummary): void {
    this.rulesService.getRules(rulesSummary.id).subscribe({
      next: (rules) => {
        const data: UserRulesDialogData = {
          crudType: CrudType.Update,
          rules: rules,
        };

        const dialogRef = this.dialog.open(UserRulesDialogComponent, { width: '800px', data: data });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.onRulesUpdated();
          }
        });
      },
      error: (_) => this.snackBarService.showError('Rules could not be found.'),
    });
  }

  deleteRules(rulesSummary: RulesSummary): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { title: 'Delete rules', message: `Do you want to delete the rules named ${rulesSummary.name}?` },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.rulesService.deleteRules(rulesSummary.id).subscribe({
          next: (_deleted) => this.onRulesDeleted(),
          error: (_) => this.onRulesDeletionError(),
        });
      }
    });
  }

  deleteAllRules(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { title: 'Delete ALL rules', message: 'Do you want to delete ALL the rules?' },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.rulesService.deleteAllRules().subscribe((_deleted) => this.onAllRulesDeleted());
      }
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
    this.snackBarService.showError('Rules could not be deleted. Are they used in a scheduled game?.');
  }

  onAllRulesDeleted(): void {
    this.refreshRules();
  }
}
