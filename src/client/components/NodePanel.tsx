import { FC } from 'react';
import './NodePanel.css';

interface NodePanelProps {
  onAddNode: (type: string) => void;
}

const NodePanel: FC<NodePanelProps> = ({ onAddNode }) => {
  return (
    <div className="node-panel">
      <h3 className="node-panel-title">Nodes</h3>
      <div className="node-list">
        <div
          className="node-item"
          onClick={() => onAddNode('httpRequest')}
          draggable
        >
          <span className="node-icon">🌐</span>
          <div className="node-info">
            <div className="node-name">HTTP Request</div>
            <div className="node-description">Make HTTP requests</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodePanel;
