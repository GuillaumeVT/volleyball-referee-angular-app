import { Component, OnInit, OnDestroy } from '@angular/core';
import { Rules, RulesSummary } from '../model/rules';
import { AbstractRulesFilter } from '../utils/abstract-rules-filter';
import { CrudType } from '../model/crudtype';
import { UserSummary } from '../model/user';
import { UserService } from '../services/user.service';
import { RulesService } from '../services/rules.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRulesModalComponent } from './user-rules-modal/user-rules-modal.component';
import { OkCancelModalComponent } from '../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-rules',
  templateUrl: './user-rules.component.html',
  styleUrls: ['./user-rules.component.css']
})
export class UserRulesComponent extends AbstractRulesFilter implements OnInit, OnDestroy {

  user: UserSummary;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private rulesService: RulesService, private modalService: NgbModal, private toastr: ToastrService) {
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
    modalRef.componentInstance.rulesUpdated.subscribe(_updated => this.onRulesCreated());
  }

  viewRules(rulesSummary: RulesSummary): void {
    this.rulesService.getRules(rulesSummary.id).subscribe(
      rules => {
        const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
        modalRef.componentInstance.rules = rules;
        modalRef.componentInstance.crudType = CrudType.View;
      },
      _error => this.toastr.error('Rules could not be found.', '', { timeOut: 5000, positionClass: 'toast-top-left' })
    );
  }

  updateRules(rulesSummary: RulesSummary): void {
    this.rulesService.getRules(rulesSummary.id).subscribe(
      rules => {
        const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
        modalRef.componentInstance.rules = rules;
        modalRef.componentInstance.crudType = CrudType.Update;
        modalRef.componentInstance.rulesUpdated.subscribe(_updated => this.onRulesUpdated());
      },
      _error => this.toastr.error('Rules could not be found.', '', { timeOut: 5000, positionClass: 'toast-top-left' })
    );
  }

  deleteRules(rulesSummary: RulesSummary): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete rules';
    modalRef.componentInstance.message = `Do you want to delete the rules named ${rulesSummary.name}?`;
    modalRef.componentInstance.okClicked.subscribe(_ok =>
      this.rulesService.deleteRules(rulesSummary.id).subscribe(_deleted => this.onRulesDeleted(), _error => this.onRulesDeletionError()));
  }

  deleteAllRules(): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete ALL rules';
    modalRef.componentInstance.message = `Do you want to delete ALL the rules?`;
    modalRef.componentInstance.okClicked.subscribe(_ok =>
      this.rulesService.deleteAllRules().subscribe(_deleted => this.onAllRulesDeleted()));
  }

  onRulesCreated(): void {
    this.refreshRules();
    this.toastr.success('Rules were successfully created', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onRulesUpdated(): void {
    this.refreshRules();
    this.toastr.success('Rules were successfully updated', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onRulesDeleted(): void {
    this.refreshRules();
    this.toastr.success('Rules were successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  onRulesDeletionError(): void {
    this.toastr.error('Rules could not be deleted. Are they used in a scheduled game?', '', { timeOut: 5000, positionClass: 'toast-top-left' });
  }

  onAllRulesDeleted(): void {
    this.refreshRules();
    this.toastr.success('All rules were successfully deleted', '', { timeOut: 2500, positionClass: 'toast-top-left' });
  }

  getPageNumber(): number {
    return 4;
  }

}
