import { Component } from '@angular/core';

interface PaperMetadata {
  fileName: string;
  title: string;
  abstract: string;
}

interface ConnectedPaper {
  title: string;
  relation: string;
  confidence: number;
}

interface SurveyOutput {
  literatureSurvey: string;
  researchGaps: string[];
  possibleDirections: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LangGraph Literature Survey Copilot';

  isLoggedIn = false;
  loginModel = {
    email: '',
    password: ''
  };

  selectedGoal = 'full-survey';

  uploadedPapers: File[] = [];
  extractedMetadata: PaperMetadata[] = [];
  connectedPapers: ConnectedPaper[] = [];
  surveyOutput: SurveyOutput | null = null;

  runState: 'idle' | 'running' | 'done' = 'idle';

  login(): void {
    if (!this.loginModel.email || !this.loginModel.password) {
      return;
    }

    this.isLoggedIn = true;
  }

  onPdfUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fileList = input.files;

    if (!fileList) {
      return;
    }

    this.uploadedPapers = Array.from(fileList).filter((file) => file.name.toLowerCase().endsWith('.pdf'));
    this.extractedMetadata = [];
    this.connectedPapers = [];
    this.surveyOutput = null;
    this.runState = 'idle';
  }

  runAgenticWorkflow(): void {
    if (!this.uploadedPapers.length) {
      return;
    }

    this.runState = 'running';

    this.extractedMetadata = this.uploadedPapers.map((file, index) => ({
      fileName: file.name,
      title: `Auto-extracted title ${index + 1}: ${this.cleanName(file.name)}`,
      abstract: `This abstract was extracted by the LangGraph parser agent for ${this.cleanName(file.name)}. It summarizes the objective, method, and key findings for downstream survey generation.`
    }));

    this.connectedPapers = this.extractedMetadata.map((paper, index) => ({
      title: `Connected work ${index + 1} for ${paper.title}`,
      relation: 'Shared task setting + complementary method',
      confidence: 84 - index * 4
    }));

    this.surveyOutput = {
      literatureSurvey: 'The uploaded papers mostly focus on retrieval-augmented generation and domain adaptation. Connected papers indicate a trend toward hybrid symbolic-neural orchestration. Current evidence suggests that evaluation is often narrow and cross-domain robustness is underexplored.',
      researchGaps: [
        'Few papers evaluate long-horizon agent memory consistency.',
        'Limited comparative benchmarks for multi-agent planning quality.',
        'Insufficient cost-performance analysis for production deployment.'
      ],
      possibleDirections: [
        'Design a benchmark for long-context literature reasoning in agentic workflows.',
        'Build an adaptive planner that selects tools based on uncertainty estimation.',
        'Propose a reproducibility framework for LangGraph-based research pipelines.'
      ]
    };

    this.runState = 'done';
  }

  private cleanName(fileName: string): string {
    return fileName.replace(/\.pdf$/i, '').replace(/[_-]/g, ' ');
  }
}
