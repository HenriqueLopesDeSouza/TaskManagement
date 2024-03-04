import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksEditComponent } from './tasks-edit.component';

describe('TasksEditComponent', () => {
  let component: TasksEditComponent;
  let fixture: ComponentFixture<TasksEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
