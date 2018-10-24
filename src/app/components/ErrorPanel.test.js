import { expect } from 'chai';
import React from 'react';
import { ErrorPanel } from './ErrorPanel';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const infoMessage = "Some error happened!";

describe("<ErrorPanel /> tests", () => {
  let mount;

  function setup(
    infoMessage,
    setDecimals = () => { },
    setTokenName = () => { },
    setTokenSymbol = () => { },
    setTotalSupply = () => { },
    setTokenType = () => { },
    setTokenOwner = () => { },
    setAppState = () => { },
    setCheckingTokenOwnerFunds = () => { },
    setTokenOwnerHasEnoughFunds = () => { },
    setInfoMessage = () => { },
    loadAllAccounts = () => { }
  ) {
    const props = {
      infoMessage: infoMessage,
      decimalsActions: { setDecimals: setDecimals },
      tokenNameActions: { setTokenName: setTokenName },
      tokenSymbolActions: { setTokenSymbol: setTokenSymbol },
      totalSupplyActions: { setTotalSupply: setTotalSupply },
      tokenTypeActions: { setTokenType: setTokenType },
      tokenOwnerActions: { setTokenOwner: setTokenOwner },
      appStateActions: { setAppState: setAppState },
      tokenOwnerFundsActions: {
        setCheckingTokenOwnerFunds: setCheckingTokenOwnerFunds,
        setTokenOwnerHasEnoughFunds: setTokenOwnerHasEnoughFunds
      },
      infoMessageActions: { setInfoMessage: setInfoMessage },
      accountsActions: { loadAllAccounts: loadAllAccounts }
    };
    return mount(<ErrorPanel {...props} />);
  }

  before(() => {
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    const { window } = jsdom;
    global.window = window;
    global.document = window.document;
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it("renders ErrorPanel", () => {
    const wrapper = setup(infoMessage);
    expect(wrapper.props().infoMessage).to.eq(infoMessage);
    expect(wrapper.props().decimalsActions).to.exist;
    expect(wrapper.props().tokenNameActions).to.exist;
    expect(wrapper.props().tokenSymbolActions).to.exist;
    expect(wrapper.props().totalSupplyActions).to.exist;
    expect(wrapper.props().tokenTypeActions).to.exist;
    expect(wrapper.props().tokenOwnerActions).to.exist;
    expect(wrapper.props().appStateActions).to.exist;
    expect(wrapper.props().tokenOwnerFundsActions).to.exist;
    expect(wrapper.props().infoMessageActions).to.exist;
    expect(wrapper.props().accountsActions).to.exist;
    expect(wrapper.find("Card").length).to.eq(1);
    expect(wrapper.find("CardHeader").length).to.eq(1);
    expect(wrapper.find("CardHeader").props().title).to.eq("Oops, Something Went Wrong!");
    expect(wrapper.find("CardContent").length).to.eq(1);
    expect(wrapper.find("Typography").length).to.eq(2);
    expect(wrapper.find("Typography").at(1).props().className).to.eq("typography_error_info_message");
    expect(wrapper.find("Typography").at(1).props().children).to.eq(infoMessage);
    expect(wrapper.find("span").length).to.eq(2);
    expect(wrapper.find("span").at(1).props().className).to.eq("btn btn-err-back wow fadeInUp");
  });

  it("simulates click on back button", () => {
    const setDecimals = sinon.spy();
    const setTokenName = sinon.spy();
    const setTokenSymbol = sinon.spy();
    const setTotalSupply = sinon.spy();
    const setTokenType = sinon.spy();
    const setTokenOwner = sinon.spy();
    const setAppState = sinon.spy();
    const setCheckingTokenOwnerFunds = sinon.spy();
    const setTokenOwnerHasEnoughFunds = sinon.spy();
    const setInfoMessage = sinon.spy();
    const loadAllAccounts = sinon.spy();
    const wrapper = setup(
      infoMessage,
      setDecimals,
      setTokenName,
      setTokenSymbol,
      setTotalSupply,
      setTokenType,
      setTokenOwner,
      setAppState,
      setCheckingTokenOwnerFunds,
      setTokenOwnerHasEnoughFunds,
      setInfoMessage,
      loadAllAccounts
    );
    wrapper.find("span").at(1).simulate("click");
    expect(setDecimals.calledOnce).to.be.true;
    expect(setTokenName.calledOnce).to.be.true;
    expect(setTokenSymbol.calledOnce).to.be.true;
    expect(setTotalSupply.calledOnce).to.be.true;
    expect(setTokenType.calledOnce).to.be.true;
    expect(setTokenOwner.calledOnce).to.be.true;
    expect(setAppState.calledOnce).to.be.true;
    expect(setCheckingTokenOwnerFunds.calledOnce).to.be.true;
    expect(setTokenOwnerHasEnoughFunds.calledOnce).to.be.true;
    expect(setInfoMessage.calledOnce).to.be.true;
    expect(loadAllAccounts.calledOnce).to.be.true;
  });
});