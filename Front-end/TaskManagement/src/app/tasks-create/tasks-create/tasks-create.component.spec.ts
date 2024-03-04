import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCreateComponent } from './tasks-create.component';

describe('TasksCreateComponent', () => {
  let component: TasksCreateComponent;
  let fixture: ComponentFixture<TasksCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
