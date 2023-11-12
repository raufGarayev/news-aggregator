import { useState } from 'react'
import { Select, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { IRootStore } from '../../redux/store'
import { getSourcesFromNewsApi } from '../../redux/slices/news/action'
import { categories } from '../../constants/categories'
import './userFeedSettings.sass'
import { exampleAuthors } from '../../constants/exampleAuthors'
import CustomButton from '../common/CustomButton'
import { handleUserFiltersGlobally } from '../../utils/handleUserFiltersGlobally'
import { NewsStateType } from '../../types/news'

type UserFeedSettingsProps = {
    state: NewsStateType['userFilters'],
    setFiltersState: (state: NewsStateType['userFilters']) => void
}

const UserFeedSettings = ({
    state,
    setFiltersState
}: UserFeedSettingsProps) => {

    const dispatch = useDispatch<AppDispatch>()
    const {sources, sourcesLoading } = useSelector((state: IRootStore) => state.news)
    const [authorSearch, setAuthorSearch] = useState('' as string)
    const {mobileDrawer} = useSelector((state: IRootStore) => state.local)

    const callSources = (open: boolean) => {
        if(open === true) {
            dispatch(getSourcesFromNewsApi())
        }
    }

    const handleUserFilters = (value: string, type: string, selected: boolean) => {
        if(selected) {
            setFiltersState({...state, [type]: [...state[type as keyof NewsStateType['userFilters']], value]})
        } else {
            setFiltersState({...state, [type]: state[type as keyof NewsStateType['userFilters']].filter((item: string) => item !== value)})
        }
    }

    const handleDrawerFilters = () => {
        handleUserFiltersGlobally(dispatch, state)
    }


  return (
    <div className="news-feed-settings">
        <p>Customize your news feed. News will be filtered by your preferences.</p>

        <div className="feed-item">
            <span className="feed-item_label">Category:</span>
            <Select
                placeholder="Select category"
                className="feed-item_select"
                mode="multiple"
                maxTagCount={'responsive'}
                onSelect={(e) => handleUserFilters(e, 'categories', true)}
                onDeselect={(e) => handleUserFilters(e, 'categories', false)}
                value={state.categories}
            >
                {categories.map((category, index) => (
                    <Select.Option key={index} value={category}>{category}</Select.Option>
                ))}
            </Select>
        </div>
        <div className="feed-item">
            <span className="feed-item_label">Source:</span>
            <Select
                placeholder="Select source"
                className="feed-item_select"
                mode="multiple"
                maxTagCount={'responsive'}
                onDropdownVisibleChange={callSources}
                notFoundContent={sourcesLoading ? <Spin style={{display: 'flex', justifyContent: 'center'}} /> : null}
                onSelect={(e) => handleUserFilters(e, 'sources', true)}
                onDeselect={(e) => handleUserFilters(e, 'sources', false)}
                value={state.sources}
            >
                {sources.map((source, index) => (
                    <Select.Option key={index} value={source.id}>{source.name}</Select.Option>
                ))}
            </Select>
        </div>
        <div className="feed-item">
            <span className="feed-item_label">Author:</span>
            <Select
                placeholder="Select author from list or type and then press Enter"
                className="feed-item_select"
                mode="multiple"
                maxTagCount={'responsive'}
                onSelect={(e) => handleUserFilters(e, 'authors', true)}
                onDeselect={(e) => handleUserFilters(e, 'authors', false)}
                value={state.authors}
                tokenSeparators={[',']}
                onInputKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        e.preventDefault()
                        handleUserFilters(authorSearch, 'authors', true)
                        setAuthorSearch('')
                    }
                }}
                searchValue={authorSearch}
                onSearch={(e) => setAuthorSearch(e)}
            >
                {exampleAuthors.map((author, index) => (
                    <Select.Option key={index} value={author}>{author}</Select.Option>
                ))}
            </Select>
        </div>
        {mobileDrawer.open && (
            <div style={{marginTop: 20, width: '85%'}}>
                <CustomButton onClick={handleDrawerFilters} type={'fullWidth'}>Set filters</CustomButton>
            </div>
        )}
    </div>
  )
}

export default UserFeedSettings