declare module '@onetoteastack/ckeditor5-free-build' {
  import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
  export default class FreeEditor extends ClassicEditor {}
}

declare module '@ckeditor/ckeditor5-react' {
  import { CKEditorProps as OriginalProps } from '@ckeditor/ckeditor5-react';

  export interface CKEditorProps extends OriginalProps {
    disableWatchdog?: boolean;
  }
}
