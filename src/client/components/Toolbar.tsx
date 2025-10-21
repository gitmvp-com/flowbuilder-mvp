import { FC } from 'react';
import './Toolbar.css';

interface ToolbarProps {
  workflowName: string;
  onWorkflowNameChange: (name: string) => void;
  onSave: () => void;
  onExecute: () => void;
  isExecuting: boolean;
}

const Toolbar: FC<ToolbarProps> = ({
  workflowName,
  onWorkflowNameChange,
  onSave,
  onExecute,
  isExecuting,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h1 className="logo">⚡ FlowBuilder</h1>
        <input
          type="text"
          className="workflow-name-input"
          value={workflowName}
          onChange={(e) => onWorkflowNameChange(e.target.value)}
          placeholder="Workflow name"
        />
      </div>
      <div className="toolbar-right">
        <button className="btn btn-secondary" onClick={onSave}>
          💾 Save
        </button>
        <button
          className="btn btn-primary"
          onClick={onExecute}
          disabled={isExecuting}
        >
          {isExecuting ? '⏳ Executing...' : '▶️ Execute'}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
