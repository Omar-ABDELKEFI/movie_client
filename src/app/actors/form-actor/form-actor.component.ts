import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreationDTO } from '../actors.model';

// Decorator to define the component
@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.css']
})
export class FormActorComponent implements OnInit {

  // Constructor to inject FormBuilder
  constructor(private formBuilder: FormBuilder) { }

  // Form group to manage actor form controls
  form: FormGroup;

  // Input property for the actor model
  @Input()
  model: actorCreationDTO;

  // Output event emitter for saving changes
  @Output()
  onSaveChanges = new EventEmitter<actorCreationDTO>();

  // Initialization logic when the component is created
  ngOnInit(): void {
    // Create the form group with controls for name, date of birth, picture, and biography
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      dateOfBirth: '',
      picture: '',
      biography: ''
    });

    // If a model is provided, patch the form values with the model
    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  // Event handler for when an image is selected
  onImageSelected(image): void {
    // Set the 'picture' form control value to the selected image
    this.form.get('picture').setValue(image);
  }

  // Event handler for changes in the markdown content
  changeMarkdown(content): void {
    // Set the 'biography' form control value to the updated markdown content
    this.form.get('biography').setValue(content);
  }

  // Event handler for saving changes and emitting the updated actor model
  saveChanges(): void {
    // Emit the form values as an actorCreationDTO
    this.onSaveChanges.emit(this.form.value);
  }
}

