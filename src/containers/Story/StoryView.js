import React from 'react';

import { withRoute } from 'services/routing/routerHOC';
import { Tags } from './components/Tags';
import { extractFieldsFromObj } from 'services/general/generalHelpers';
import { SimilarStories } from 'containers/Story/components/SimilarStories';
import { Footer } from 'components/Footer';
import { useTranslation } from 'react-i18next';

export const StoryView = withRoute(props => {
    const { t } = useTranslation();
    const story = props.location.state;
    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    const proccessedStory = extractFieldsFromObj(story, [
        'background',
        'whatTriggeredChange',
        'howDidYouManged',
        'additionalnfo',
        'whatHelpedYou',
        'storyContent'
    ]);
    return (
        <div id={'story-page-container'}>
            <header>
                <ul className={'header-menu-container'}>
                    <button
                        className={'BTX-back-white'}
                        onClick={() => changeLocationByPath('/')}
                    />
                    <button className={'BTN-search'} />
                </ul>
                <div className={'logo'} />
                <button className={'BTN-lang-changer'} />
            </header>
            <button className={'BTN-accessibility'} />
            <div className={'quote'}>
                <h1>"{story.quote}"</h1>
                <h2>
                    {`
                     ${t('storyView.storyOf')}
                     ${story.name.split('')[0]}׳ 
                     ${story.timestamp.split(' ')[0]} 
                   `}
                </h2>
                <Tags tags={story.tags} />
            </div>
            {proccessedStory &&
                Object.keys(proccessedStory).map((item, key) => (
                    <div key={key}>
                        <h6>{t(item)}</h6>
                        <span>{proccessedStory[item]}</span>
                        <br />
                    </div>
                ))}
            <SimilarStories
                tags={story.tags}
                changeLocationByPath={changeLocationByPath}
            />
            <button className="footercustom">
                <span className="helpright">
                    <button className="BTX-help2"></button>
                    <p>{t('storyView.listeningEar')}</p>
                </span>
                <span className="shareleft">
                    <button className="BTX-share"></button>
                    <p>{t('storyView.share')}</p>
                </span>
            </button>
            <Footer />
        </div>
    );
});
