import { Subscription } from 'rxjs';
import { UserSummary } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserRulesModalComponent } from 'src/app/modules/user-data/components/user-rules-modal/user-rules-modal.component';
import { CrudType } from 'src/app/modules/user-data/models/crud-type.model';
import { RulesService } from 'src/app/modules/user-data/services/rules.service';
import { OkCancelModalComponent } from 'src/app/shared/components/ok-cancel-modal/ok-cancel-modal.component';
import { AbstractRulesFilter } from 'src/app/shared/models/abstract-rules-filter.model';
import { Rules, RulesSummary } from 'src/app/shared/models/rules.model';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-user-rules',
  templateUrl: './user-rules.component.html',
  styleUrls: ['./user-rules.component.css']
})
export class UserRulesComponent extends AbstractRulesFilter implements OnInit, OnDestroy {

  user: UserSummary;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private rulesService: RulesService, private modalService: NgbModal, private snackBarService: SnackBarService) {
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
      _error => this.snackBarService.showError('Rules could not be found.', 5000)
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
      _error => this.snackBarService.showError('Rules could not be found.', 5000)
    );
  }

  deleteRules(rulesSummary: RulesSummary): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete rules';
    modalRef.componentInstance.message = `Do you want to delete the rules named ${rulesSummary.name}?`;
    modalRef.componentInstance.okClicked.subscribe((_ok: any) =>
      this.rulesService.deleteRules(rulesSummary.id).subscribe(_deleted => this.onRulesDeleted(), _error => this.onRulesDeletionError()));
  }

  deleteAllRules(): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete ALL rules';
    modalRef.componentInstance.message = `Do you want to delete ALL the rules?`;
    modalRef.componentInstance.okClicked.subscribe((_ok: any) =>
      this.rulesService.deleteAllRules().subscribe(_deleted => this.onAllRulesDeleted()));
  }

  onRulesCreated(): void {
    this.refreshRules();
    this.snackBarService.showInfo('Rules were successfully created.', 5000);
  }

  onRulesUpdated(): void {
    this.refreshRules();
    this.snackBarService.showInfo('Rules were successfully updated.', 5000);
  }

  onRulesDeleted(): void {
    this.refreshRules();
    this.snackBarService.showInfo('Rules were successfully deleted.', 5000);
  }

  onRulesDeletionError(): void {
    this.snackBarService.showInfo('Rules could not be deleted. Are they used in a scheduled game?.', 5000);
  }

  onAllRulesDeleted(): void {
    this.refreshRules();
    this.snackBarService.showInfo('All rules were successfully deleted.', 5000);
  }
}
