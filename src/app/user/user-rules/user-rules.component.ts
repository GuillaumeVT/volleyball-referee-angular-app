import { Component, OnInit, OnDestroy } from '@angular/core';
import { Rules } from '../../model/rules';
import { RulesDescription } from '../../model/rules-description';
import { RulesFilter } from '../../utils/rulesfilter';
import { CrudType } from '../../model/crudtype';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { RulesService } from '../../services/rules.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRulesModalComponent } from '../user-rules-modal/user-rules-modal.component';
import { OkCancelModalComponent } from '../../ok-cancel-modal/ok-cancel-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-rules',
  templateUrl: './user-rules.component.html',
  styleUrls: ['./user-rules.component.css']
})
export class UserRulesComponent implements OnInit, OnDestroy {

  user:        User;
  rulesfilter: RulesFilter;

  private subscription : Subscription = new Subscription();

  constructor(private titleService: Title, private userService: UserService, private rulesService: RulesService, private modalService: NgbModal, private toastr: ToastrService) {
    this.titleService.setTitle('VBR - My Rules');
    this.rulesfilter = new RulesFilter();
  }

  ngOnInit() {
    this.subscription.add(this.userService.userState.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.refreshRules();
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshRules(): void {
    this.rulesService.listRules().subscribe(rules => this.rulesfilter.updateRules(rules), error => this.rulesfilter.updateRules([]));
  }

  createRules(kind: string): void {
    const rules = Rules.createRules(this.user, kind);
    const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
    modalRef.componentInstance.rules = rules;
    modalRef.componentInstance.crudType = CrudType.Create;
    modalRef.componentInstance.rulesUpdated.subscribe(updated => this.onRulesCreated());
  }

  viewRules(rulesDescription: RulesDescription): void {
    this.rulesService.getRules(rulesDescription.id).subscribe(
      rules => {
        const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
        modalRef.componentInstance.rules = rules;
        modalRef.componentInstance.crudType = CrudType.View;
      },
      error => this.toastr.error('Rules could not be found.', '', { timeOut: 5000, positionClass: 'toast-top-left' })
    );
  }

  updateRules(rulesDescription: RulesDescription): void {
    this.rulesService.getRules(rulesDescription.id).subscribe(
      rules => {
        const modalRef = this.modalService.open(UserRulesModalComponent, { size: 'lg' });
        modalRef.componentInstance.rules = rules;
        modalRef.componentInstance.crudType = CrudType.Update;
        modalRef.componentInstance.rulesUpdated.subscribe(updated => this.onRulesUpdated());
      },
      error => this.toastr.error('Rules could not be found.', '', { timeOut: 5000, positionClass: 'toast-top-left' })
    );
  }

  deleteRules(rulesDescription: RulesDescription): void {
    const modalRef = this.modalService.open(OkCancelModalComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Delete rules';
    modalRef.componentInstance.message = `Do you want to delete the rules named ${rulesDescription.name}?`;
    modalRef.componentInstance.okClicked.subscribe(ok =>
      this.rulesService.deleteRules(rulesDescription.id).subscribe(deleted => this.onRulesDeleted(), error => this.onRulesDeletionError()));
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

  getPageNumber(): number {
    return 4;
  }

}
