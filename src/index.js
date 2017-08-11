const panelGroups = [
  {
    panelIds: [ 'hb-panel', 'bp-panel', 'lj-panel' ],
    panelElements: [],
    summaryElements: [],
  },
  {
    panelIds: [ 'wf-panel', 'lb-panel', 'sh-panel' ],
    panelElements: [],
    summaryElements: [],
  },
  // {
  //   panelIds: [ 'fu-panel' ],
  //   panelElements: [],
  //   summaryElements: [],
  // }
];

function initPanelGroup(panelGroup) {
  panelGroup.panelElements =
    panelGroup.panelIds.map(id => document.getElementById(id));

  panelGroup.summaryElements =
    panelGroup.panelIds.map(id => document.getElementById(`${id}-summary`));

  panelGroup.panelElements.forEach(p => {
    p.addEventListener('click', () => {
      selectPanel(p, panelGroup);
    });
  });
}

function selectPanel(panel, panelGroup) {
  const summaryId = `${panel.id}-summary`;

  panelGroup.panelElements.forEach(p => {
    if (p !== panel) {
      p.classList.remove('selected');
    }
  });

  panelGroup.summaryElements.forEach(s => {
    if (s.id !== summaryId) {
      s.style.visibility = 'hidden';
    } else {
      s.style.visibility = 'visible';
    }
  });

  panel.classList.add('selected');
}

function init() {
  panelGroups.forEach(panelGroup => initPanelGroup(panelGroup));
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
