import { Subscription } from 'rxjs';
import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserRulesModalComponent } from 'src/app/modules/user-data/components/user-rules-modal/user-rules-modal.component';
import { CrudType } from 'src/app/modules/user-data/models/crud-type.model';
import { RulesService } from 'src/app/modules/user-data/services/rules.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AbstractRulesFilter } from 'src/app/shared/models/abstract-rules-filter.model';
import { Rules, RulesSummary } from 'src/app/shared/models/rules.model';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-rules',
  templateUrl: './user-rules.component.html',
  styleUrls: ['./user-rules.component.css']
})
export class UserRulesComponent extends AbstractRulesFilter implements OnInit, OnDestroy {

  user: UserSummary;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private rulesService: RulesService, private dialog: MatDialog, private modalService: NgbModal, private snackBarService: SnackBarService) {
    super();
    this.titleService.setTitle('VBR - My Rules');
  }

  ngOnInit() {
    this.subscription.add(this.userService.authState.subscribe(userToken => {
      this.user = userToken.user;
      if (this.user) {
        this.refreshRules();
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshRules(): void {
    this.rulesService.listRules(this.getKinds()).subscribe(rules => this.onRulesReceived(rules), _error => this.onRulesReceived([]));
  }

  createRules(kind: string): void {
    const rules = Rules.createRules(this.user, kind);
    const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
    modalRef.componentInstance.rules = rules;
    modalRef.componentInstance.crudType = CrudType.Create;
    modalRef.componentInstance.rulesUpdated.subscribe((_updated: any) => this.onRulesCreated());
  }

  viewRules(rulesSummary: RulesSummary): void {
    this.rulesService.getRules(rulesSummary.id).subscribe(
      rules => {
        const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
        modalRef.componentInstance.rules = rules;
        modalRef.componentInstance.crudType = CrudType.View;
      },
      _error => this.snackBarService.showError('Rules could not be found.')
    );
  }

  updateRules(rulesSummary: RulesSummary): void {
    this.rulesService.getRules(rulesSummary.id).subscribe(
      rules => {
        const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
        modalRef.componentInstance.rules = rules;
        modalRef.componentInstance.crudType = CrudType.Update;
        modalRef.componentInstance.rulesUpdated.subscribe((_updated: any) => this.onRulesUpdated());
      },
      _error => this.snackBarService.showError('Rules could not be found.')
    );
  }

  deleteRules(rulesSummary: RulesSummary): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Delete rules', message: `Do you want to delete the rules named ${rulesSummary.name}?` }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.rulesService.deleteRules(rulesSummary.id).subscribe(_deleted => this.onRulesDeleted(), _error => this.onRulesDeletionError());
      }
    });
  }

  deleteAllRules(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: { title: 'Delete ALL rules', message: 'Do you want to delete ALL the rules?' }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.rulesService.deleteAllRules().subscribe(_deleted => this.onAllRulesDeleted());
      }
    });
  }

  onRulesCreated(): void {
    this.refreshRules();
    this.snackBarService.showInfo('Rules were successfully created.');
  }

  onRulesUpdated(): void {
    this.refreshRules();
    this.snackBarService.showInfo('Rules were successfully updated.');
  }

  onRulesDeleted(): void {
    this.refreshRules();
    this.snackBarService.showInfo('Rules were successfully deleted.');
  }

  onRulesDeletionError(): void {
    this.snackBarService.showInfo('Rules could not be deleted. Are they used in a scheduled game?.');
  }

  onAllRulesDeleted(): void {
    this.refreshRules();
    this.snackBarService.showInfo('All rules were successfully deleted.');
  }
}
