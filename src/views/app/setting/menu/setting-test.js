import React, { Component } from 'react';
import SortableTree, { toggleExpandedForAll, changeNodeAtPath, insertNode, removeNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import {Button, Input} from "reactstrap"; 

export default class SortTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: '',
            searchFocusIndex: 0,
            currentNode: {},
            treeData: [
                { title: 'Comic Books', children: [{ title: 'Amazing Spider-Man' }, { title: 'The Incredible Hulk' }, { title: 'Action Comics' }, { title: 'Batman' }, { title: 'New Avengers' }] },
                { title: 'Historical Fiction Books', children: [{ title: 'The Help' }, { title: 'All the Light We Cannot See' }, { title: ' The Color Purple' }, { title: ' War and Peace' }] },
            ],
        };
    }

    expandAndCollapse = (expanded) => {
        this.setState({
            treeData: toggleExpandedForAll({
                treeData: this.state.treeData,
                expanded,
            }),
        });
    };

    updateTreeData(treeData) {
        this.setState({ treeData });
    }
    removeNode = (path) => {
        this.setState(state => ({
            treeData: removeNodeAtPath({
                treeData: state.treeData,
                path,
                getNodeKey: ({ treeIndex }) => treeIndex,
            })
        }));
    }
    selectThis = (node, path) => {
        this.setState({ currentNode: node, path: path });
    }
    insertNewNode = () => {
        this.setState(state => ({
            treeData: insertNode({
                treeData: state.treeData,
                depth: 0,
                minimumTreeIndex: state.treeData.length,
                newNode: { title: "", children: [] },
                getNodeKey: ({ treeIndex }) => treeIndex
            }).treeData
        }));
    }

    render() {
        const { searchString, searchFocusIndex, treeData } = this.state;
        const getNodeKey = ({ treeIndex }) => treeIndex;

        return (
            <div style={{ height: 800 }}>
                <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
                    <h2>React Sortable Tree</h2>
                    <Button size='mini' color='blue' onClick={() => { this.expandAndCollapse(true); }}>Expand all</Button>
                    <Button size='mini' color='blue' onClick={() => { this.expandAndCollapse(false); }}>Collapse all</Button>&nbsp;&nbsp;&nbsp;
                    <Input size='mini' placeholder='Search' value={searchString}
                           onChange={event => this.setState({ searchString: event.target.value })} />
                </div>

                <SortableTree
                    searchQuery={searchString}
                    onChange={this.updateTreeData}
                    searchFocusOffset={searchFocusIndex}
                    treeData={treeData}
                    onChange={treeData => this.setState({ treeData })}
                    generateNodeProps={({ node, path }) => ({
                        title: (
                            <form onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.selectThis(node, path); }}>
                                <input
                                    style={{ fontSize: "1rem", width: 200 }}
                                    value={node.title}
                                    onChange={event => {
                                        const title = event.target.value;
                                        this.setState(state => ({
                                            treeData: changeNodeAtPath({
                                                treeData: state.treeData,
                                                path,
                                                getNodeKey,
                                                newNode: { ...node, title }
                                            })
                                        }));
                                    }}
                                />&nbsp;&nbsp;&nbsp;
                                <Button size='mini' basic color='blue' circular icon='add' onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.insertNewNode(path) }} />
                                <Button size='mini' basic color='blue' circular icon='trash' onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.removeNode(path) }} />
                            </form>
                        )
                    })}
                />
            </div>
        );
    }
}
