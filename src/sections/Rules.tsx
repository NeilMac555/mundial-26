import { Markdown } from '../components/Markdown';
import { TCaption, TCaptionItem } from '../components/terminal/atoms';
import rulesMd from '../content/rules.md?raw';

export function Rules() {
  return (
    <div>
      <TCaption>
        <TCaptionItem label="Source" value="src/content/rules.md" />
        <TCaptionItem label="Notes" value="Edit the markdown to update the section" />
      </TCaption>
      <div style={{ marginTop: 18 }}>
        <Markdown source={rulesMd} />
      </div>
    </div>
  );
}
